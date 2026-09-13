export function validateJoinForm(fields) {
  const errors = {};
  if (!fields.name?.trim())       errors.name       = 'Full name is required.';
  if (!fields.email?.trim())      errors.email      = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(fields.email)) errors.email = 'Enter a valid email.';
  if (!fields.department?.trim()) errors.department = 'Please select your department.';
  if (!fields.year?.trim())       errors.year       = 'Please select your year.';
  if (!fields.domain?.trim())     errors.domain     = 'Please select a domain.';
  if (!fields.motivation?.trim()) errors.motivation = 'Please tell us your motivation.';
  return { valid: Object.keys(errors).length === 0, errors };
}
