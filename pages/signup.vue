<template>
    <div class="bg-[#151515] h-screen w-screen flex justify-center items-center flex-col">
        <div class="p-4 w-[25%] bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form class="space-y-6 w-[100%]">
                <h5 class="text-xl font-medium text-gray-900 dark:text-white">Signup</h5>
                <div>
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                    <input 
                        v-model="username"
                        type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Username" required>
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                    <input 
                        v-model="email"
                        type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@domain.com" required>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                    <input 
                        v-model="pass"
                        type="password" name="password" id="password" placeholder="Password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                <p class="text-red-500" v-if="!!error">{{ error }}</p>
                <button @click="login"  type="submit" class="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">It's Morbin' Time</button>
            </form>
        </div>
    </div>
</template>
<script>
    import { gql, useMutation } from '@urql/vue';

    export default {
        data() {
            return {
                username: "",
                pass: "",
                email: "",
                error: ""
            }
        },
         watch: {
            email(){
                this.$data.error = "";
            },
            pass(){
                this.$data.error = "";
            },
            username(){
                this.$data.error = "";
            }
        },
        setup() {
            const mutation = gql`
                    mutation createUser($email: String!, $pass: String!, $username: String! ) {
                        createUser(email:$email, pass:$pass, username:$username) {
                            id
                        }
                    }
                `;
            const { executeMutation:createUser, fetching:attemptingLogin } = useMutation(mutation);
            return {
                createUser,
                attemptingLogin
            }
        },
        methods: {
            async login(e){
                e.preventDefault();
                e.stopPropagation();
                const email = this.$data.email;
                const pass = this.$data.pass;
                const username = this.$data.username; 

                    console.log(email, pass, username);
                if (!email || !pass || !username) {
                    this.$data.error = "Please enter a valid email, password, or username.";
                    return;
                }; 

                const response = await this.createUser({ 
                   email, pass, username
                })

                const errors = response.error?.graphQLErrors || [];

                if (!!errors.length) {
                    this.$data.error = errors.map(error => error.message).join(", ");
                    return;
                };

                const hasAccess = useCookie("has_access"); 
                if (!!hasAccess.value) {
                    navigateTo({
                        path: "/~"
                    })
                }
            },
        }
    }
</script>
<style scoped>
.container {
    font-family: 'Courier New';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #151515;
}
</style>