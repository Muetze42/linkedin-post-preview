<template>
    <header class="fixed top-0 w-full p-2 bg-blue-900 text-white text-center">
        <button type="button" class="border rounded p-1" @click="switchTheme">
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
        </button>
    </header>
    <div class="my-20 max-w-[555px] mx-auto">
        <textarea class="form-textarea w-full text-black rounded" v-model="input"></textarea>
        <input type="file" accept="image/*" @change="previewImage" class="form-control-file">
        <div class="bg-card-100 dark:bg-card-950 mt-4 rounded-xl border-2 dark:border-card-950">
            <div class="p-4 text-sm opacity-90 whitespace-pre" v-html="output" />
            <img v-if="preview" :src="preview" alt="image">
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        switchTheme() {
            this.isDark ? localStorage.theme = null : localStorage.theme = 'dark'
            this.setTheme()
        },
        setTheme() {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
                this.isDark = true
            } else {
                document.documentElement.classList.remove('dark')
                this.isDark = false
            }
        },
        previewImage: function(event) {
            let input = event.target;
            if (input.files) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
    },
    computed: {
        output() {
            return this.input.trim().replace(/(^|\s)(#[a-z\d-]+)/ig, '$1<span class="text-[#0a66c2] dark:text-[#70b5f9] hover:underline cursor-pointer font-semibold opacity-90">$2</span>')
        }
    },
    data() {
        return {
            preview: null,
            image: null,
            input: '',
            isDark: null,
        }
    },
    mounted() {
        this.setTheme()
    }
}
</script>

<style scoped>

</style>
