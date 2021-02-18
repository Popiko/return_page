<template>
  <div>
    班级：
    <select @change="filterTodos($event)">
      <option value="all">all</option>
      <option value="401">401</option>
      <option value="402">402</option>
      <option value="403">403</option>
      <option value="404">404</option>
      <option value="405">405</option>
      <option value="406">406</option>
      <option value="407">407</option>
      <option value="408">408</option>
      <option value="409">409</option>
    </select>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FilterTodos",
  methods: mapActions(["filterTodos"])
};
</script>

<style scoped>
select {
  margin-top: 20px;
  padding: 6px;
  border: #41b883 1px solid;
}
</style>
