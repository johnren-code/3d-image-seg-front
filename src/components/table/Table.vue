<template>
  <el-table :data="drawTableDataFromParent" height="400">
    <el-table-column label="选择颜色">
      <template slot-scope="scope">
        <el-color-picker v-model="scope.row.color" color-format="rgb"></el-color-picker>
      </template>
    </el-table-column>
    <el-table-column label="label" prop="label"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Table",
  props:['drawTableDataFromParent'],
  data() {
    return {
    };
  },
  watch: {
    drawTableDataFromParent: {
      handler(newVal, oldVal) {
        // 在 tableData 发生变化时执行的操作
        this.$emit('update-parent-var', newVal);
      },
      deep: true // 深度监听 tableData，以便检测数组项的变化
    }
  }
}
</script>

<style scoped>
.el-table {
  overflow-y: auto;
}
</style>