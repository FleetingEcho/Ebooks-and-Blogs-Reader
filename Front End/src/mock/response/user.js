import Mock from 'mockjs'

const Random = Mock.Random


export const getUserInfo = (options) => {
  const template = {
    'str|2-4': 'jake',//repeat times
    'name|1': 'jake',//repeat times
    'age|+2': 18,//add 2 every round
    'num|4-10': 0,
    'float|3-10.2-5': 0,
    'bool|1': true,
    'bool2|1-9': true, // min/(min+max)
    'obj|2': {
      a: 'aa',
      b: 'bb',
      c: 'cc'
    },
    'obj2|1-2': {
      a: 'aa',
      b: 'bb',
      c: 'cc'
    },
    'arr|2-4': [1, 2, 3],
    'arr2|2': ['a', 'b'],
    'func': () => {
      return 'this is created by function'
    },
    'reg': /[1-9][a-z]/,
    email: Mock.mock('@email'),
    range: Random.range(3, 10, 2),
    date: Random.date('yyyy-MM-dd'),
    time: Random.time('hh:mm'),
    datetime: Random.datetime('yyyy-MM-dd hh:mm'),
    now: Random.now('hour', 'yyyy-MM-dd a hh:mm'),
    img: Random.image('100x200', '#00ff00', '#ffffff', 'png', 'Lison'),
    img_base64: Random.dataImage(),
    color: Random.color(),
    cword: Random.cword('玩儿螺丝刀', 2, 5),
    cname: Random.cname(),
    email2: Random.email('lison.com'),
    region: Random.region(),
    province: Random.province(),
    city: Random.city(true),
    county: Random.county(true),
    zip: Random.zip(),
    upperFirstLetter: Random.capitalize('lison'),
    pick: Random.pick([1, 2, 3, 4]),
    shuffle: Random.shuffle([1, 2, 3, 4]),
    guid: Random.guid(),
    fruit: Random.fruit(),
    fruit2: '@fruit'
  }
  return Mock.mock(template)
}

// return token
export const login = () => {
  return {
    code: 200,
    data: {
      token: 'xxx'
    },
    mes: ''
  }
}

// Later, some routes need permission to be set to true to access
// It also plays a control role in the final routing directory display content
export const authorization = () => {
  return {
    code: 200,
    data: {
      token: 'xxx',
      rules: {
        page: {
					Home: true,
					home:true,
					index:true,
					upload:true,
					blogs:true,
					// showMd:false,
					showMd:true,
					feel:true,
					form:false,
					myBooks:true,
					Ebook:true,
					feelings:false,
					login:true,

        },
        component: {
          // edit_button: true,
          // publish_button: false
        }
    },
    mes: ''
  }
}
