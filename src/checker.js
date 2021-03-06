export const checkPermission = (current, rules) => {
  if (rules.generate === undefined && !Array.isArray(rules)) {
    return console.error('[vue-rbac] your have invalid rules');
  }

  if (!Array.isArray(rules)) {
    rules = rules.generate();
  }

  let hasAllowed = false;
  rules.forEach(rule => {
    if (rule.includes('*')) hasAllowed = true;
  });

  if (hasAllowed) return true;

  const checkAnds = rules.map(rule => {
    let valid = true;
    rule.forEach(and => (valid = current.includes(and)));
    return valid;
  });

  let result = false;
  checkAnds.forEach(or => {
    if (or) result = or;
  });

  return result;
};
