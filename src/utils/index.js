const autoExpand = (field, reset) => {
  // Reset field height
  field.style.height = '';

  if (reset) return;

  const scrollHeight = field.scrollHeight;
  // Get the computed styles for the element
  const computed = window.getComputedStyle(field);

  // Calculate the height
  const height =
    parseInt(computed.getPropertyValue('border-top-width'), 10) +
    parseInt(computed.getPropertyValue('padding-top'), 10) +
    scrollHeight +
    parseInt(computed.getPropertyValue('padding-bottom'), 10) +
    parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  field.style.height = height + 'px';
};

export default autoExpand;
