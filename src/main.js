const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last')
const data_value = window.localStorage.getItem('data')
console.log(data_value);
const dataArray = JSON.parse(data_value);
console.log(dataArray);
const hashMap = dataArray || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //正则表达式，删除'/'后面的所有内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                    <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                    </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi);
        $li.on('click', () => {
            window.open(node.url); //为新生成的li添加点击事件，打开新窗口
        });
        $li.on('click', '.close', (e) => {
            e.stopPropagation(); //事件委托到close元素，阻止close元素冒泡，以免点击该元素，事件会传播到li上
            hashMap.splice(index, 1); //删除数组里面的当前项
            render(); //重新遍历数组，渲染页面
        })


    })
}
render();
$('.addButton').on('click', () => {
    let url = window.prompt("请输入您要添加的网址");
    if (url.indexOf('https') !== 0) {
        url = 'https://' + url;
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(), //把用户输入的网址的第一个首字母作为logo
        url: url
    });
    render();

})
window.onbeforeunload = () => {
    const dataString = JSON.stringify(hashMap);
    window.localStorage.setItem('data', dataString);
}
$(document).on('keypress', (e) => {
    // const key=e.key= const {key}=e
    const { key } = e; //解构赋值,获取用户按下的哪个键
    for (let i = 0; i < hashMap.length; i++) {
        //判断按下的键是不是数组里面logo属性值是不是和key相等
        if (hashMap[i].logo.toLowerCase() === key) {
            // 相等打开该对象里面的url
            window.open(hashMap[i].url);
        }
    }
})