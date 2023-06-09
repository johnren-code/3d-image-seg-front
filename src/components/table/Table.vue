<template>
  <el-table :data="tableData">
    <el-table-column label="选择颜色" width="120">
      <template slot-scope="scope">
        <el-color-picker v-model="scope.row.color" color-format="rgb"></el-color-picker>
      </template>
    </el-table-column>
    <el-table-column label="label" prop="otherProperty"></el-table-column>
    <el-table-column label="RGB值" prop="otherProperty"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      tableData: [
        { color: '#ff0000', otherProperty: 'label 1' },
        { color: '#00ff00', otherProperty: 'label 2' },
        { color: '#0000ff', otherProperty: 'label 3' }
      ]
    };
  },
  watch: {
    tableData: {
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

</style>