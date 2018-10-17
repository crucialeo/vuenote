$(function() {
    var vm = new Vue({
        el: '#vm',
        data: {
            name: 'evan',
            age: 19,
        }
    })
    window.vm = vm

    // form
    var form = new Vue({
        el: '#id-form',
        data: {
            email: '',
            name: '',
            language: [],
        },
        methods: {
            register: function() {
                alert(JSON.stringify(this.$data))
            }
        }
    })
    window.form = form

    // todo
    var todo = new Vue({
        el: '#id-todo',
        data: {
            todos: [
                {
                    name: 'review',
                    description: 'new iphone',
                },
                {
                    name: 'project',
                    description: 'dir',
                },
                {
                    name: 'eat',
                    description: 'now',
                },
            ]
        }
    })
    window.todo = todo

    // table
    var table = new Vue({
        el: '#id-table',
        data: {
            title: 'New Sheet',
            header: [ // 对应首行 A, B, C...
                { row: 0, col: 0, text: 'A' },
                { row: 0, col: 1, text: 'B' },
                { row: 0, col: 2, text: 'C' },
                { row: 0, col: 3, text: 'J' },
            ],
            rows: [
                [
                    { row: 1, col: 0, text: '1', contentEditable: false, align: ''},
                    { row: 1, col: 1, text: '4', contentEditable: true, align: '' },
                    { row: 1, col: 2, text: '5', contentEditable: true, align: '' },
                    { row: 1, col: 3, text: '7', contentEditable: true, align: '' },
                ],
                [
                    { row: 2, col: 0, text: '2', contentEditable: false, align: '' },
                    { row: 2, col: 1, text: '3', contentEditable: true, align: '' },
                    { row: 2, col: 2, text: '6', contentEditable: true, align: '' },
                    { row: 2, col: 3, text: '8', contentEditable: false, align: '' },
                ],
                [
                    { row: 3, col: 0, text: '3', contentEditable: false, align: '' },
                    { row: 3, col: 1, text: 'j', contentEditable: true, align: '' },
                    { row: 3, col: 2, text: 'd', contentEditable: true, align: '' },
                    { row: 3, col: 3, text: 's', contentEditable: true, align: '' },
                ]
            ],
            selectedRowIndex: 0, // 当前活动单元格的row
            selectedColIndex: 0 // 当前活动单元格的col
        },
        methods: {
            focus: function(cell) {
                this.selectedRowIndex = cell.row
                this.selectedColIndex = cell.col
                console.log('row', cell.row, 'col', cell.col)
            },
            change: function(e) {
                var rowIndex = this.selectedRowIndex
                var colIndex = this.selectedColIndex
                var text = e.target.innerText
                if (rowIndex > 0 && colIndex > 0) {
                    this.rows[rowIndex - 1][colIndex].text = text
                }

            },
        }
    })
    window.table = table

    var setAlign = function(align) {
        var rowIndex = table.selectedRowIndex
        var colIndex = table.selectedColIndex
        var row = table.rows[rowIndex - 1]
        var cell = row[colIndex]
        cell.align = align
    }
    $('#id-button-left').click(function () {
        setAlign('left');
    });
    $('#id-button-center').click(function () {
        setAlign('center');
    });
    $('#id-button-right').click(function () {
        setAlign('right');
    });

    // component
    Vue.component('todo-item', {
        props: ['todo'],
        template: '<li>{{todo.text}}</li>',
    })

    var todoComponent = new Vue({
        el: '#id-todo-component',
        data: {
            groceryList: [
                {
                    id: 0,
                    text: 'vegetable',
                },
                {
                    id: 1,
                    text: 'cheese',
                },
                {
                    id: 2,
                    text: 'other human food',
                },
            ]
        }
    })
    window.todoComponent = todoComponent

    // 计算属性
    var computed = new Vue({
        el: '#id-computed',
        data: {
            message: 'hello',
        },
        computed: {
            reversedMessage: function() {
                return this.message.split('').reverse().join('')
            }
        }
    })
    var computedSetter = new Vue({
        el: '#id-setter',
        data: {
            firstName: 'Foo',
            lastName: 'Bar',
        },
        computed: {
            fullName: {
                get: function() {
                    return this.firstName + ' ' + this.lastName
                },
                set: function(newValue) {
                    var names = newValue.split(' ')
                    this.firstName = names[0]
                    this.lastName = names[names.length - 1]
                }
                // 现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用
                // vm.firstName 和 vm.lastName 也会相应地被更新。
                // 貌似 setter 就是可以通过 fullName 去更新 firstName 和 lastName
            }
        }
    })
    window.computedSetter = computedSetter

    // 在 v-for 块中，我们拥有对父作用域属性的完全访问权限。v-for 还支持一个可选的第二个参数为当前项的索引。
    var listRender = new Vue({
        el: '#id-listRender',
        data: {
            parentMessage: 'parent',
            items: [
                {
                    message: 'foo',
                },
                {
                    message: 'bar',
                },
            ]
        }
    })
    window.listRender = listRender

    // 对象的 v-for
    var objectRender = new Vue({
        el: '#id-objectRender',
        data: {
            object: {
                firstName: 'John',
                lastName: 'Doe',
                age: 30,
            }
        }
    })


    // 想要增加属性，直接加是不行的。必须用 set 或者 $set
    var addKey = new Vue({
        el: '#id-addKey',
        data: {
            userProfile: {
                name: 'Anika',
            }
        }
    })
    window.addKey = addKey

    // 一个完整的 todo 的例子
    // Vue.component('todo-list-item', {
    //     template: `
    //         <li>{{ title }}
    //             <button v-on:click="$emit('remove')">Remove</button>
    //         </li>
    //         `,
    //     props: ['title'],
    // })
    // var todoExample = new Vue({
    //     el: '#todo-list-example',
    //     data: {
    //         newTodoText: '',
    //         todos: [
    //             {
    //                 id: 1,
    //                 title: 'Do the dishes',
    //             },
    //             {
    //                 id: 2,
    //                 title: 'Take out the trash',
    //             },
    //             {
    //                 id: 3,
    //                 title: 'Mow the lawn',
    //             },
    //         ],
    //         nextTodoId: 4,
    //     },
    //     methods: {
    //         addNewTodo: function() {
    //             this.todos.push({
    //                 id: this.nextTodoId++,
    //                 title: this.newTodoText,
    //             })
    //             this.newTodoText = ''
    //         }
    //     }
    // })
    Vue.component('todo-item', {
        template: `<li>{{ done }} {{ title }}<button v-on:click="$emit('remove')">Remove</button></li>`,
        props: ['title', 'done'],
    })
    var todoExample = new Vue({
        el: '#todo-list-example',
        data: {
            newTodoText: '',
            todos: [
                {
                    id: 1,
                    title: 'eat',
                    done: 'yes',
                },
                {
                    id: 2,
                    title: 'drink',
                    done: 'no',
                },
                {
                    id: 3,
                    title: 'sleep',
                    done: 'yes',
                },
            ],
            nextTodoId: 4,
        },
        methods: {
            addNewTodo: function() {
                this.todos.push({
                    id: this.nextTodoId++,
                    title: this.newTodoText,
                })
            }
        }
    })
    window.todoExample = todoExample

    // 监听事件
    var eventExample1 = new Vue({
        el: '#id-event-1',
        data: {
            counter: 0,
        },
        methods: {
            add: function(event) {
                // this 在方法里面指向当前 Vue 实例
                // event 是原生的 DOM 事件
                this.counter += 1
                console.log('counter', this.counter)
            }
        }
    })
    window.eventExample1 = eventExample1

    var eventExample2 = new Vue({
        el: '#id-event-2',
        methods: {
            warn: function(message, event) {
                if (event) {
                    event.preventDefault()
                }
                alert(message)
            }
        }
    })
})
