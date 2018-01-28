export const renderMath = (value) => {
  return window.renderMathInElement(value, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\[", right: "\\]", display: false },
      { left: "\\(", right: "\\)", display: false }
    ]
  });
};

export const convertToJSON = (body) => {
  if(body.status < 200 || body.status >= 300) {
    return { err: body.statusText };
  }
  return body.json();
}

export const setHeaders = (token) => {
  return {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Authorization': token ? `Bearer ${token}` : null
  };
};
