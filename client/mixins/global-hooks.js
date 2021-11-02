import { nanoid } from 'nanoid'

export default {
  created() {
    this.initListners()
  },
  methods: {
    initListners() {
      if (process.client) {
        //   if (this.$store.state.auth.logged) {
        let token = nanoid()
        this.$socket.client.io.opts.query = { token: `Guest ${token}` }
        this.$socket.client.connect()
        //   }

        //   this.$nuxt.$on('socket::init', () => {
        //     this.$socket.client.io.opts.query = { token: `Bearer ${this.$store.state.auth.authToken}` }
        //     this.$socket.client.connect()
        //   })
        //   this.$nuxt.$on('socket::close', () => {
        //     this.$socket.client.disconnect()
        //   })
        //   this.$nuxt.$on('app::logout', () => {
        //     this.$router.push(this.localePath('/login'))
        //   })
      }
    }
  }
}