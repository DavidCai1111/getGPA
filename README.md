# getGPA
无需验证码，上海理工大学学生绩点查询 

###运行:
    C:\xxx\xxx>node getGPA.js 教务系统用户名 密码

    输出:
    [getGPA] 输入的用户名为：12121212
    [getGPA] 输入的密码为：12121212
    [getGPA] 开始登录!
    [getGPA] 登录中...
    [getGPA] 登录成功,开始获取平均学分绩点...
    [getGPA] 结果：平均学分绩点：   3.33

###过程:
    |-- casperjs登录教务系统,截取验证码图像
    |-- MyImgFilter.java进行图像预处理
    |-- tesseract分析输出验证码文本
    |-- casperjs进入绩点界面，进入其iframe，获取GPA
    |-- 利用node对各过程进行粘合，调度，并在分析错误时循环尝试