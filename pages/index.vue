<template>
    <div class="container">
        <div class="heading">
            <p>Morb.it</p>
        </div>
        <div class="subhead">
            <h3>An actually fast browser IDE</h3>
        </div>
        <div class="align-items-center w-[12%] h-[30%] buttonline">
            <div class="sign">
                <button type="button" class="button w-[75%] h-[100%] text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-[50px] mr-2 mb-2 ">Sign Up</button>
            </div>
            <div class="log w-[100%]">
                <button type="button" class="button w-[100%] h-[100%] text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Log In</button>        
            </div>
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
}
.heading {
    color: #0A758F;
    margin-top: 15%;
    font-size: 75px;
    margin-bottom: 20px;
    text-decoration: none;
}
.subhead {
    color: #971F1F;
    font-size: 20px;
    text-decoration: none;
}
.button {
    font-family: 'Courier New';
}
.sign {
    margin-left: -75%;
    margin-right: 40%;
}
.log {
    margin-top: -52px;
    margin-left: 65%;
}
.buttonline {
    margin-left: 1%;
}
</style>