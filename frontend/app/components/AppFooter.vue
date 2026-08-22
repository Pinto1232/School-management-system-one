<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="site-footer__about">
        <NuxtLink class="brand" to="/" aria-label="School System home">
          <img src="/images/logo-96.png" alt="" width="42" height="42">
          <span>School System</span>
        </NuxtLink>
        <p>One workspace for school administration, teaching, learning, and family communication.</p>
      </div>
      <div>
        <h3>Platform</h3>
        <nav aria-label="Platform links">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/about">About</NuxtLink>
          <NuxtLink to="/faq">FAQs</NuxtLink>
        </nav>
      </div>
      <div>
        <h3>Account</h3>
        <nav aria-label="Account links">
          <NuxtLink to="/login">Log in</NuxtLink>
          <NuxtLink to="/register">Create account</NuxtLink>
          <NuxtLink to="/forgetPassword">Reset password</NuxtLink>
        </nav>
      </div>
    </div>
    <div class="container site-footer__legal">
      © {{ new Date().getFullYear() }} School System. All rights reserved.
    </div>
  </footer>
</template>
