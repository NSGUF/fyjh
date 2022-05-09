<template>
    <div class="pagination">
        <button :disabled="pageNum === 1" @click="pageCompute(pageNum - 1)">
            上一页
        </button>
        <button v-if="startEnd.start !== 1" @click="pageCompute(1)">1</button>
        <button v-if="startEnd.start > 2">···</button>

        <span v-for="page in startEnd.end" :key="page">
            <button
                :class="{ active: pageNum === page }"
                v-if="page >= startEnd.start"
                @click="pageCompute(page)"
            >
                {{ page }}
            </button>
        </span>

        <button v-if="startEnd.end < totalPageNo - 1">···</button>
        <button
            v-if="startEnd.end !== totalPageNo"
            @click="pageCompute(totalPageNo)"
        >
            {{ totalPageNo }}
        </button>
        <button
            :disabled="pageNum === totalPageNo"
            @click="pageCompute(pageNum + 1)"
        >
            下一页
        </button>
        <input
            v-model.number="val"
            type="text"
            class="page-input"
            @blur="inputPage"
        />
        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "JPagination",

    props: {
        //   当前页
        pageNum: {
            type: Number,
            default: 1,
        },
        // 总数量
        total: {
            type: Number,
            default: 1,
        },
        // 每页数量
        pageSize: {
            type: Number,
            default: 3,
        },
        // 连续页数
        continueNo: {
            type: Number,
            default: 3,
        },

        changePageNo: {
            type: Function,
        },
    },
    data: () => {
        return {
            val: 1,
        };
    },
    computed: {
        //计算总页数
        totalPageNo() {
            return Math.ceil(this.total / this.pageSize);
        },

        startEnd() {
            let start = 0;
            let end = 0;
            let { totalPageNo, pageNum, continueNo } = this;

            if (totalPageNo <= continueNo) {
                start = 1;
                end = totalPageNo;
            } else {
                start = pageNum - Math.floor(continueNo / 2);
                end = pageNum + Math.floor(continueNo / 2);
                if (start <= 1) {
                    start = 1;
                    end = continueNo;
                }
                if (end >= totalPageNo) {
                    end = totalPageNo;
                    start = end - continueNo + 1;
                }
            }

            return { start, end };
        },
    },

    methods: {
        pageCompute(num) {
            this.val = num
            this.changePageNo(Math.abs(num));
        },

        inputPage() {
            let num = this.val;
            if (typeof num === "number") {
                num =
                    num > this.totalPageNo
                        ? this.totalPageNo
                        : num < 1
                        ? 1
                        : num;
                this.val = num;
                this.changePageNo(Math.abs(num));
            } else {
                this.val = 1;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.pagination {
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 20px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
    .page-input {
        width: 20px;
        height: 22px;
    }
}
</style>
