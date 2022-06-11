import { defineComponent } from "vue"

export default defineComponent({
  name: "JCell",
  props: {
    title: {
      type: String,
      default: "",
    }
  },
  setup(props) {

    return () => (
      <div>这是一行文字</div>
    )
  }
})