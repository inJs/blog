### 平日维护中遇到的一些BUG， 认为或许对大家有些帮助。 记录之

> 嗯， 就是我踩的一些坑， over

------

+ `sessionStorage`、`localStorage` 存储超限问题(不单纯)
    > 因为[sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage) 和 [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 本身一内存大小限制， 在超出指定的配额时， 会抛出 `Error: QuotaExceededError: DOM Exception 2` 的异常， 
      在这种情况下，使用 `session(local)Storage.clear()` 即可解决该问题。 而在浏览器开启`无痕模式`下， 也会抛出同错的Exception, 而在这种场景下的使用， 
      只能同过一些polyfill手段去处理。 以下附上一张各平台中支持情况以及容量大小。![Storage支持情况及容量大小](https://github.com/inJs/blog/blob/master/assets/bugs/storage-supports.png), 可能存在信息滞后， 请自己确认。
      另， 可用[该网站](http://dev-test.nemikor.com/web-storage/support-test/)测试Storage支持情况和容量大小！