<template>
    <div class="bg-[#151515] h-screen w-screen flex justify-center items-center flex-col">
        <div class="p-4 w-[25%] bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form class="space-y-6 w-[100%]">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Login</h5>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input 
                v-model="username"
                type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@domain.com" required>
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
            <input
                v-model="pass"
                type="password" name="password" id="password" placeholder="Password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
        </div>
        <p class="text-red-500" v-if="!!error">{{ error }}</p>
        
        <button @click="login" type="submit" class="w-full relative text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Login
            <loader v-if="attemptingLogin" style="transform: translate(-50%, -50%)" class="absolute top-[50%] left-[50%]" />
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <NuxtLink to="pages/signup" class="text-blue-700 hover:underline dark:text-blue-500">Create account</NuxtLink>
        </div>
    </form>
</div>
</div>
</template>
<script>
import { gql, useMutation } from '@urql/vue';
import LoaderCircle from '~~/components/LoaderCircle/LoaderCircle.vue';



export default {
  components: { LoaderCircle },
    data() {
        return {
            username: "",
            pass: "",
            error: ""
        }
    },
    watch: {
        pass(){
            this.$data.error = "";
        },
        username(){
            this.$data.error = "";
        }
    },
    setup() {
        const mutation = gql`
                mutation loginClient($email: String!, $pass: String!) {
                    loginClient(email:$email, pass:$pass) {
                        id
                    }
                }
            `;
        const { executeMutation:loginClient, fetching:attemptingLogin } = useMutation(mutation);
        return {
            loginClient,
            attemptingLogin
        }
    },
    methods: {
        async login(e){
            e.preventDefault();
            e.stopPropagation();
            const email = this.$data.username;
            const pass = this.$data.pass;

                console.log(email, pass);
            if (!email || !pass) {
                this.$data.error = "Please enter a valid email and password.";
                return;
            }; 

            const response = await this.loginClient({ 
                email, pass
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