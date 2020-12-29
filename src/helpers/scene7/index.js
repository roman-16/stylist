const addParams = (url, { preset, width, height, fit, align }) => {
  const parsedURL = new URL(url, window.location.origin);

  parsedURL.search = preset ? `?$${preset}$&` : '?';

  const searchParams = new URLSearchParams();

  width && searchParams.append('wid', width);
  height && searchParams.append('hei', height);
  fit ? searchParams.append('fit', fit) : searchParams.append('fit', 'crop'); // Crop if no fit is provided
  align && searchParams.append('align', align);

  parsedURL.search += searchParams.toString();

  return parsedURL.href;
};

export default { addParams };
