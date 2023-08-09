/* eslint-disable */
console.log('HELLO RMD YYY ！！！', Date.now());
$(function () {
  const sleep = (time = 3000) =>
    new Promise(resolve => setTimeout(resolve, time));

  const getRandomNumberInRange = (min, max) => {
    // 确保 min 和 max 是整数
    min = Math.ceil(min);
    max = Math.floor(max);

    // 生成随机整数
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const customAjax = html =>
    new Promise(resolve => {
      GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://127.0.0.1:7001/shengcai',
        headers: {
          'Content-Type': 'application/json',
        },

        data: JSON.stringify({
          html,
        }),

        onload: function (response) {
          // console.log(response.responseText);
          resolve();
        },
      });
    });

  window.debugger = null;

  const targetNode = document.getElementById('TkExerciseInfo');

  const observer = new MutationObserver(async mutationsList => {
    // for (let mutation of mutationsList) {
    //   console.log('AT-[ mutation &&&&&********** ]', mutation);
    // }
    // return;
    // 如果不是答题页面直接忽略
    if (!$('#TkExerciseInfo').is(':visible')) {
      console.log('不是答题页面，不执行任何逻辑');
      return;
    }

    console.log('-----------------》答题页面，开始进入判断逻辑');

    // 正确答案
    // const realAnsewer = $('#lblAnsewer').text();

    // 查看答案按钮
    const ansewerBtn = $('#BtnShowAnswer');

    if (ansewerBtn.is(':visible')) {
      console.log('检测到正在展示《查看答案按钮》');
      const time1 = getRandomNumberInRange(20000, 30000);
      console.log(`正在等待${time1}ms后...`, '点击查看答案按钮');

      await sleep(time1);

      console.log('等待结束', '点击查看答案按钮');
      // 点击查看答案
      ansewerBtn.click();
      return;
    } else {
      console.log('检测到正在展示答案数据中', '收集数据发给服务器');
      const html = $('.OperationAreaInner').html();

      await customAjax(html);

      console.log('服务器接收数据完毕');

      // 阅读答案一会
      // const time2 = getRandomNumberInRange(8000, 10000);
      const time2 = getRandomNumberInRange(20000, 30000);
      console.log(`正在等待${time2}ms后...`, '点击下一题');

      await sleep(time2);

      console.log(`点击下一题`);
      // $('#nextExercise').get(0).click();
      console.log('------->>>', $('.answerCardInfo li').eq(2).find('a'));
      $('.answerCardInfo li').eq(2).find('a').click();
    }
  });

  observer.observe(targetNode, {
    attributes: true,
    childList: true,
    subtree: true,
  });
});
