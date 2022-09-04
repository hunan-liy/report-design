<template>
  <div>
    <rd-table
      ref="table"
      :tableColumns="tableColumns"
      :tableData="tableData"
    >
    </rd-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableColumns: [
        {
          label: '姓名',
          prop: 'userName'
        },
        {
          label: '年龄',
          prop: 'age'
        },
        {
          label: '性别',
          prop: 'sex',
          formatter: (row) => {
            let { sex } = row;
            if (sex === 1) {
              return '男';
            } else {
              return '女';
            }
          }
        },
        {
          label: '生日',
          prop: 'birthday'
        },
        {
          label: '邮箱',
          prop: 'email'
        },
        {
          label: '地址',
          prop: 'address'
        },
        {
          type: 'operation',
          label: '操作',
          prop: 'operation',
          operations: [
            {
              prop: 'edit',
              label: '修改'
            },
            {
              prop: 'delete',
              label: '删除'
            }
          ]
        }
      ],
      tableData: [
        {
          id: 1,
          age: 24,
          sex: 1,
          birthday: '1982-11-05',
          email: 's.ylverdbkr@mlcxkb.cc',
          address: '新和县',
          userName: '武芳'
        },
        {
          id: 2,
          age: 15,
          sex: 2,
          birthday: '2010-11-22',
          email: 'x.phqdyoxwx@dlgj.name',
          address: '平川区',
          userName: '龙丽'
        },
        {
          id: 3,
          age: 20,
          sex: 1,
          birthday: '2020-12-01',
          email: 'c.gkybrgtla@oqfzodtgi.iq',
          address: '磐安县',
          userName: '蔡芳'
        },
        {
          id: 4,
          age: 20,
          sex: 1,
          birthday: '1998-01-14',
          email: 'v.pbmk@gndxbcjee.lk',
          address: '河北区',
          userName: '夏丽'
        },
        {
          id: 5,
          age: 15,
          sex: 2,
          birthday: '2003-04-11',
          email: 'n.jtjsirxdlq@kbemg.an',
          address: '-',
          userName: '戴丽'
        },
        {
          id: 6,
          age: 16,
          sex: 1,
          birthday: '1972-01-28',
          email: 'n.iqt@gxcbmi.cq',
          address: '彝良县',
          userName: '卢丽'
        }
      ]
    };
  }
};
</script>
