<template>
  <div class="h-svh">
    <div
      class="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white"
    >
      <div class="flex items-center mb-8">
        <span class="text-4xl font-bold mr-4">404</span>
        <div class="border-l-4 border-black pl-4">
          <h1 class="text-4xl font-semibold text-gray-800">Page Not Found</h1>
        </div>
      </div>
      <p class="text-lg text-gray-600 mb-8">
        The page you are looking for doesn't exist or has been removed.
      </p>
      <Link href="/" class="px-6 py-3 underline font-semibold rounded-md">
        Go to Home
      </Link>
    </div>
  </div>
</template>
