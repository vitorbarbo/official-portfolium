import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const githubProxyInterceptor: HttpInterceptorFn = (req, next) => {
  // Only intercept GitHub API requests in development
  if (isDevMode() && req.url.startsWith('https://api.github.com')) {
    // Replace GitHub API URL with proxy path
    const proxyUrl = req.url.replace('https://api.github.com', '/api/github');
    const clonedReq = req.clone({
      url: proxyUrl,
    });
    return next(clonedReq);
  }
  return next(req);
};

