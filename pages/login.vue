<template>
    <div class="flex justify-center h-screen container w-screen">
        <div class="p-4 w-[25%] bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form class="space-y-6 w-[100%]" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Log In</h5>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
            <input type="password" name="password" id="password" placeholder="********" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2" required>
        </div>
        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <NuxtLink to="pages/signup" class="text-blue-700 hover:underline dark:text-blue-500">Create account</NuxtLink>
        </div>
    </form>
</div>
</div>
</template>

<style>
.container {
    font-family: 'Courier New';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #151515;
}
</style>