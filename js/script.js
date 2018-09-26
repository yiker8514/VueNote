Vue.component('note', {
    props: ["todo"],
    template: `<div class="card">
        <div class="card-body">
            <h2 class="card-title">{{getTitle || '笔记标题'}}</h2>
            <textarea class="form-control" rows="3" v-model="todo.text" @keyup="upload"></textarea>
            <p class="card-text">{{getTime}} {{todo.text.length}}字</p>
            <i class="fa fa-trash" title="删除这条笔记" @click="del"></i>
        </div>
    </div>`,
    computed: {
        getTitle: function () {
            return _.truncate(this.todo.text, {'length': 24});
        },
        getTime: function () {
            return moment(this.todo.time).fromNow()
        }
    },
    methods: {
        del: function () {
            //console.log(this._uid-1)
            //删除当前的笔记
            app.notes.splice(this._uid - 1, 1);

            //赋值本地存储
            localStorage.setItem('notes', JSON.stringify(app.notes));

        },
        //修改笔记的事件
        upload: function () {
            //当前的笔记内容
            app.notes[this._uid - 1].text = this.todo.text;
            //当前的笔记时间 = 当前的时间戳
            app.notes[this._uid - 1].time = Date.parse(new Date());


            //赋值本地存储
            localStorage.setItem('notes', JSON.stringify(app.notes));

        }
    }
})

var app = new Vue({
    el: "#app",
    data: {
        notes: [
            {"text": "笔记内容1", "time": 1537778713000},
            {"text": "笔记内容2", "time": 1537778417000},
            {"text": "笔记内容3", "time": 1537578317000}
        ]
    },
    methods: {
        add: function () {
            this.notes.unshift({"text": "", "time": Date.parse(new Date())})

            //光标自动定位到第一个表单 
            document.querySelector("textarea").focus();


            //赋值本地存储
            localStorage.setItem('notes', JSON.stringify(this.notes));

        }
    },
    created: function () {
        //浏览器打开的时候赋值本地存储的值
        if (localStorage.getItem('notes') !== null) {
            this.notes = JSON.parse(localStorage.getItem('notes'));
        }
    }
})

//自动撑开多行文本框
autosize(document.querySelectorAll('textarea'));
