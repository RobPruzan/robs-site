// @ts-nocheck
const ctx = canvas.getContext("2d"); const dpr = window.devicePixelRatio; const
rect = canvas.getBoundingClientRect();

canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;

canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;

ctx.scale(dpr, dpr);