import { defineComponent } from 'vue'

export default defineComponent({
  name: 'JButton',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <button class="bg-red">这个一个按钮{props.title}</button>
    )
  },
})
