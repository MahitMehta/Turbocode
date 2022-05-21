<template>
    <div class="bg-[#151515] h-screen w-screen flex justify-center items-center flex-col">
        <div class="head">
            <h3>Projects</h3>
        </div>
        <div class="create">
            <NuxtLink to="pages/editor">
                <button type="submit" class="w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create a Project</button> 
            </NuxtLink>
        </div>
        <div class="boxexistence border-10 border-solid border-[#fff]">
            <Project />
        </div>
    </div>
</template>

<style scoped>
.container {
    font-family: 'Courier New';
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #151515;
}
.head {
    color:#971F1F;
    transform: translate(-300px, -110px);
    font-size: 25px;
    text-decoration: none;
    margin-top: 200px;
}
.create {
    transform: Translate(0px, -150px);
    margin-left: 600px;
    width: 250px;
}
.boxexistence {
    width: 800px;
    height: 500px;
    border-radius: 10px;
    transform: Translate(28px, -100px);
    margin-bottom: 0px;
}
</style>

