const baseUrl = 'https://v2.jqei.store', defaultOptions = {duration: 4000, showClose: true, showProgress: true, position: 'top-right'},
    iconMap = {
        success: '<i class="fas fa-check"></i>',
        error: '<i class="fa fa-times"></i>',
        warning: '<i class="fa fa-exclamation-triangle"></i>',
        info: '<i class="fa fa-exclamation-circle"></i>'
    };

function createToast(type, title, message, options) {
    const opts = $.extend({}, defaultOptions, options);
    const toastId = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const toastHtml = `<div class="toast ${type}"id="${toastId}"><div class="toast-icon">${iconMap[type] || iconMap.info}</div><div class="toast-content">${title ? `<div class="toast-title">${title}</div>` : ''}<div class="toast-message">${message}</div></div>${opts.showClose ? '<button class="toast-close" onclick="closeToast(\'' + toastId + '\')">&times;</button>' : ''}${opts.showProgress ? `<div class="toast-progress"style="animation-duration: ${opts.duration}ms;"></div>` : ''}</div>`;
    return {id: toastId, html: toastHtml, duration: opts.duration}
}

function toast(type, title, message, options) {
    const toast = createToast(type, title, message, options);
    const $container = $('#toastContainer');
    if ($container.length === 0) {
        $('body').append('<div class="toast-container" id="toastContainer"></div>');
    }
    $('#toastContainer').append(toast.html);
    const $toast = $('#' + toast.id);
    setTimeout(() => {
        $toast.addClass('show');
    }, 10);
    if (toast.duration > 0) {
        setTimeout(() => {
            closeToast(toast.id);
        }, toast.duration);
    }
    return toast.id;
}

window.closeToast = function (toastId) {
    const $toast = $('#' + toastId);
    if ($toast.length) {
        $toast.removeClass('show');
        setTimeout(() => {
            $toast.remove();
        }, 300);
    }
};

function validateEmail(email) {
    const strictRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return strictRegex.test(email);
}

$(function() {
    // 菜单切换
    $('#menuToggle').click(function() {
        $('#navMenu').addClass('active');
        $('body').css('overflow', 'hidden');
    });

    $('#closeMenu').click(function() {
        $('#navMenu').removeClass('active');
        $('body').css('overflow', 'auto');
    });

    // 点击空白处关闭菜单
    $(document).mouseup(function(e) {
        var navMenu = $("#navMenu");
        if (!navMenu.is(e.target) && navMenu.has(e.target).length === 0 && navMenu.hasClass('active')) {
            navMenu.removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });

    // 页面加载动画
    $('body').css('opacity', '0').animate({opacity: 1}, 500);

    // 响应式调整
    $(window).resize(function() {
        if ($(window).width() > 768) {
            $('#navMenu').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });

    // 添加滚动到顶部的按钮
    const scrollToTop = $('<div class="scroll-to-top"><i class="fas fa-chevron-up"></i></div>');
    $('body').append(scrollToTop);

    scrollToTop.click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            scrollToTop.fadeIn();
        } else {
            scrollToTop.fadeOut();
        }
    });

    // 查询分类弹层功能
    $('#categoryToggle').click(function() {
        const categoryOverlay = $('<div class="category-overlay" id="categoryOverlay"></div>');
        categoryOverlay.append($(`
                    <div class="category-modal">
                        <div class="close-modal" id="closeModal">
                            <i class="fas fa-times"></i>
                        </div>
                        <h2 class="category-modal-name">服务分类</h2>
                        <div class="category-grid">
                            <div class="category-card sky-blue">
                                <div class="category-header">
                                     <div class="category-icon">
                                        <i class="fab fa-google"></i>
                                    </div>
                                    <div class="category-title">账号购买</div>
                                </div>
                                <div class="category-desc">国内外各类平台账号购买服务</div>
                                <a href="/account.html" class="category-btn" target="_blank">查看更多账号商品</a>
                            </div>

                            <div class="category-card turquoise-water">
                                <div class="category-header">
                                    <div class="category-icon">
                                        <i class="fas fa-sms"></i>
                                    </div>
                                    <div class="category-title">短信接码</div>
                                </div>
                                <div class="category-desc">全球实体手机卡接码服务</div>
                                <a href="/sms.html" class="category-btn" target="_blank">查看更多接码服务</a>
                            </div>

                            <div class="category-card orange">
                                <div class="category-header">
                                    <div class="category-icon">
                                        <i class="fas fa-search"></i>
                                    </div>
                                    <div class="category-title">信息查询</div>
                                </div>
                                <div class="category-desc">各类个人信息查询服务</div>
                                <a href="/personal-info.html" class="category-btn" target="_blank">查看更多查询服务</a>
                            </div>

                            <div class="category-card carmine">
                                <div class="category-header">
                                    <div class="category-icon">
                                        <i class="fas fa-sim-card"></i>
                                    </div>
                                    <div class="category-title">手机卡购买</div>
                                </div>
                                <div class="category-desc">全球实名手机卡购买服务</div>
                                <a href="/sim-card.html" class="category-btn" target="_blank">查看更多手机卡</a>
                            </div>
                        </div>
                    </div>
                `));
        $('body').append(categoryOverlay);

        // 显示弹层
        categoryOverlay.css('display', 'flex');
        $('body').css('overflow', 'hidden');

        // 关闭弹层
        $('#closeModal').click(function() {
            categoryOverlay.remove();
            $('body').css('overflow', 'auto');
        });

        // 点击弹层外部关闭
        categoryOverlay.click(function(e) {
            if (e.target === this) {
                categoryOverlay.remove();
                $('body').css('overflow', 'auto');
            }
        });

        // 分类按钮点击事件
        $('.category-btn').click(function() {
            categoryOverlay.remove();
            $('body').css('overflow', 'auto');
        });
    });

    // 登录/注册弹层功能
    function showAuthModal(type) {
        const loginOverlay = $('<div class="login-overlay" id="loginOverlay"></div>');
        let modalContent = '';
        if (type === 'login') {
            modalContent = `
                        <div class="login-modal">
                            <div class="close-login-modal" id="closeLoginModal">
                                <i class="fas fa-times"></i>
                            </div>
                            <h2 style="color: var(--text-dark); margin-bottom: 30px; text-align: center;">用户登录</h2>
                            <form id="loginForm">
                                <div class="form-group">
                                    <label for="loginEmail">邮箱账户</label>
                                    <input type="email" id="loginEmail" name="email" required>
                                </div>
                                <div class="form-group">
                                    <label for="loginPassword">密码</label>
                                    <input type="password" id="loginPassword" name="password" required>
                                </div>
                                <div class="form-options">
                                    <a href="#" class="forgot-password" id="showForgotPassword">忘记密码？</a>
                                </div>
                                <button type="button" class="btn signin-btn" style="width: 100%; margin-top: 20px;">登录</button>
                            </form>
                            <div style="text-align: center; margin-top: 20px;">
                                <span>还没有账号？</span>
                                <a href="#" class="auth-switch" data-type="register">立即注册</a>
                            </div>
                        </div>
                    `;
        } else if (type === 'register') {
            modalContent = `
                        <div class="login-modal">
                            <div class="close-login-modal" id="closeLoginModal">
                                <i class="fas fa-times"></i>
                            </div>
                            <h2 style="color: var(--text-dark); margin-bottom: 30px; text-align: center;">用户注册</h2>
                            <form id="registerForm">
                                <div class="form-group">
                                    <label for="registerEmail">邮箱账户</label>
                                    <input type="email" id="registerEmail" name="email" required>
                                </div>
                                <div class="form-group">
                                    <label for="registerPassword">密码</label>
                                    <input type="password" id="registerPassword" name="password" required>
                                </div>
                                <div class="form-group">
                                    <label for="confirmPassword">确认密码</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                                </div>
                                <button type="button" class="btn signup-btn" style="width: 100%; margin-top: 20px;">注册</button>
                            </form>
                            <div style="text-align: center; margin-top: 20px;">
                                <span>已有账号？</span>
                                <a href="#" class="auth-switch" data-type="login">立即登录</a>
                            </div>
                        </div>
                    `;
        } else if (type === 'forgot') {
            modalContent = `
                        <div class="login-modal">
                            <div class="close-login-modal" id="closeLoginModal">
                                <i class="fas fa-times"></i>
                            </div>
                            <h2 style="color: var(--text-dark); margin-bottom: 30px; text-align: center;">找回密码</h2>
                            <form id="forgotForm">
                                <div class="form-group">
                                    <label for="forgotEmail">邮箱账户</label>
                                    <input type="email" id="forgotEmail" name="email" required>
                                    <small style="color: var(--text-light); margin-top: 5px; display: block;">
                                        我们将向该邮箱发送密码重置链接
                                    </small>
                                </div>
                                <button type="button" class="btn forget-btn" style="width: 100%; margin-top: 20px;">发送重置链接</button>
                            </form>
                            <div style="text-align: center; margin-top: 20px;">
                                <a href="#" class="auth-switch" data-type="login">返回登录</a>
                            </div>
                        </div>
                    `;
        }

        loginOverlay.html(modalContent);
        $('body').append(loginOverlay);

        // 显示弹层
        loginOverlay.css('display', 'flex');
        $('body').css('overflow', 'hidden');

        // 关闭登录弹层
        $('#closeLoginModal').click(function() {
            loginOverlay.remove();
            $('body').css('overflow', 'auto');
        });

        // 点击弹层外部关闭
        loginOverlay.click(function(e) {
            if (e.target === this) {
                loginOverlay.remove();
                $('body').css('overflow', 'auto');
            }
        });

        // 切换登录/注册/找回密码
        $('.auth-switch').click(function(e) {
            e.preventDefault();
            const type = $(this).data('type');
            loginOverlay.remove();
            showAuthModal(type);
        });

        // 显示找回密码
        $('#showForgotPassword').click(function(e) {
            e.preventDefault();
            loginOverlay.remove();
            showAuthModal('forgot');
        });

        // 登录
        $('.signin-btn').click(function (){
            var email = $('#loginEmail').val(),
                password = $('#loginPassword').val();
            if(email === ""){
                toast('error', '', '请输入邮箱账户');
                return false;
            }

            if(!validateEmail(email)){
                toast('error', '', '邮箱格式不正确');
                return false;
            }

            $.ajax({
                url: baseUrl + '/api/auth/sign-in',
                type:'post',
                dataType:'json',
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify({email:email, password:password}),
                success:function (result){
                    if(result.code === 1){
                        Cookies.set('token', result.data.token, {expires:30});
                        Cookies.set('email', result.data.email, {expires:30});
                        toast('success', '', result.message);
                        setTimeout(function (){
                            location.reload();
                        }, 2000);
                        return false;
                    }

                    toast('error', '', result.message);
                }
            });
        });

        // 注册
        $('.signup-btn').click(function (){
            var email = $('#registerEmail').val(),
                password = $('#registerPassword').val(),
                confirm_password = $('#confirmPassword').val();

            if(email === ''){
                toast('error', '', '请输入邮箱账户');
                return false;
            }

            if(!validateEmail(email)){
                toast('error', '', '邮箱格式不正确');
                return false;
            }

            if(password !== confirm_password){
                toast('error', '', '两次输入的密码不一致');
                return false;
            }

            $.ajax({
                url:baseUrl + '/api/auth/sign-up',
                type:'post',
                dataType:'json',
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify({email:email, password:password}),
                success:function (result){
                    if(result.code === 1){
                        Cookies.set('token', result.data.token, {expires:30});
                        Cookies.set('email', result.data.email, {expires:30});
                        toast('success', '', result.message);
                        setTimeout(function (){
                            location.reload();
                        }, 2000);
                        return false;
                    }

                    toast('error', '', result.message);
                }
            });
        });

        $('.forget-btn').click(function (){
            var email = $('#forgotEmail').val();
            if(email === ""){
                toast('error', '', '请输入邮箱账户');
                return false;
            }

            if(!validateEmail(email)){
                toast('error', '', '邮箱格式不正确');
                return false;
            }

            $.ajax({
                url:baseUrl + '/api/auth/forget-password',
                type:'post',
                dataType:'json',
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify({email:email}),
                success:function (result){
                    if(result.code === 1){
                        toast('success', '', result.message);
                        setTimeout(function (){
                            location.reload();
                        }, 2000);
                        return false;
                    }

                    toast('error', '', result.message);
                }
            });
        });
    }

    // 登录按钮点击事件
    $('#loginBtn, #mobileLoginBtn').click(function(e) {
        e.preventDefault();
        showAuthModal('login');
    });

    if(Cookies.get('email') === undefined) {
        $('#loginBtn').show();
        $('.user-name,.logout-btn,#s-balance-container').hide();
    } else {
        $('#loginBtn').hide();
        $('.user-name').text(Cookies.get('email'));
        $('.user-name,.logout-btn,#s-balance-container').show();
    }

    $('.logout-btn').click(function (){
        Cookies.remove('email');
        Cookies.remove('token');

        toast('success', '', '退出登录成功');
        setTimeout(function (){
            location.reload();
        }, 2000);
    });

    // 搜索功能
    $('#a-search-input').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        const productItems = $('.a-product-item');
        productItems.each(function() {
            const title = $(this).find('.a-product-title').text().toLowerCase();
            if (title.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    const categoryItems = $('#a-category-list li');
    categoryItems.each(function() {
        $(this).click(function() {
            const categoryId = $(this).data('id');

            // 更新活跃状态
            categoryItems.removeClass('active');
            $(this).addClass('active');

            // 筛选商品
            const productItems = $('.a-product-item');
            if (categoryId === 'all') {
                productItems.show();
            } else {
                productItems.each(function() {
                    if ($(this).data('gid') == categoryId) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            }
        });
    });

    $('#a-category-sidebar').on('scroll', function() {
        const $hint = $('#scrollHint');
        const scrollTop = $(this).scrollTop();
        const scrollHeight = $(this)[0].scrollHeight;
        const clientHeight = $(this).innerHeight();
        if (scrollTop > 0) {
            $hint.addClass('hidden');
        } else {
            $hint.removeClass('hidden');
        }
        if (scrollTop <= 10) {
            $hint.removeClass('hidden');
        }
    });

    $('#mobileCategoryToggle').click(function() {
        $('#a-category-sidebar').addClass('active');
        $('#a-category-overlay').addClass('active');
        $('body').css('overflow', 'hidden');
    });

    $('#a-category-overlay').click(function() {
        $('#a-category-sidebar').removeClass('active');
        $('#a-category-overlay').removeClass('active');
        $('body').css('overflow', 'auto');
    });

    $('#a-category-list li').click(function() {
        if ($(window).width() <= 768) {
            $('#a-category-sidebar').removeClass('active');
            $('#a-category-overlay').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });

    // 分类标签切换
    $('.p-filter-tab').click(function() {
        $('.p-filter-tab').removeClass('active');
        $(this).addClass('active');

        const categoryId = $(this).data('id');
        filterProducts(categoryId);
    });

    // 实时搜索功能
    $('.p-search-input').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        filterProductsBySearch(searchTerm);
    });

    // 分类筛选函数
    function filterProducts(categoryId) {
        if (categoryId === 0) {
            // 显示全部产品
            $('.p-product-card').show();
        } else {
            // 显示指定分类的产品
            $('.p-product-card').hide();
            $(`.p-product-card[data-gid="${categoryId}"]`).show();
        }
    }

    // 搜索筛选函数
    function filterProductsBySearch(searchTerm) {
        $('.p-product-card').each(function() {
            const productTitle = $(this).find('.p-product-card-title').text().toLowerCase();
            if (productTitle.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // 案例展示模态框
    const caseItems = $('.pd-case-item');
    let currentCaseIndex = 0;

    // 打开模态框
    caseItems.click(function() {
        currentCaseIndex = caseItems.index(this);
        openModal(currentCaseIndex);
    });

    // 关闭模态框
    $('#pd-modal-close').click(function() {
        closeModal();
    });

    // 上一张
    $('#pd-modal-prev').click(function() {
        currentCaseIndex = (currentCaseIndex - 1 + caseItems.length) % caseItems.length;
        updateModalContent(currentCaseIndex);
    });

    // 下一张
    $('#pd-modal-next').click(function() {
        currentCaseIndex = (currentCaseIndex + 1) % caseItems.length;
        updateModalContent(currentCaseIndex);
    });

    // 点击模态框背景关闭
    $('#pd-case-modal').click(function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // 键盘导航
    $(document).keydown(function(e) {
        if ($('#pd-case-modal').is(':visible')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                $('#pd-modal-prev').click();
            } else if (e.key === 'ArrowRight') {
                $('#pd-modal-next').click();
            }
        }
    });

    // 打开模态框函数
    function openModal(index) {
        updateModalContent(index);
        $('#pd-case-modal').fadeIn().attr('style', 'display:flex;');
        $('body').css('overflow', 'hidden');
    }

    // 关闭模态框函数
    function closeModal() {
        $('#pd-case-modal').fadeOut();
        $('body').css('overflow', 'auto');
    }

    // 更新模态框内容
    function updateModalContent(index) {
        const caseItem = caseItems.eq(index);
        const imgSrc = caseItem.find('img').attr('src');
        $('#pd-modal-content').html(`<img src="${imgSrc}" alt="案例${index + 1}">`);
    }

    // 购买按钮点击
    $('.pd-purchase-btn').click(function() {
        const dataEle = $('#data'), emailEle = $('#email');
        const data = dataEle.val(),
            email = emailEle.val(),
            notes = $('#notes').val(),
            title = $('.pd-product-title').text(),
            price = ($('.pd-product-price').text()).replace('$', '');
        if(data === ""){
            toast('error', '', dataEle.attr('placeholder'));
            return false;
        }

        if(email === ""){
            toast('error', '', '请输入接收查询结果的邮箱');
            return false;
        }

        if(!validateEmail(email)){
            toast('error', '', '邮箱格式不正确');
            return false;
        }

        $.ajax({
            url: baseUrl + '/api/order/create',
            type:'post',
            dataType:'json',
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({website_id:2, name:title, price:price, email:email, quantity:1, data:data, notes:notes}),
            success:function (result){
                if(result.code === 1){
                    toast('success', '', result.message);
                    setTimeout(function (){
                        location.href = baseUrl + '/api/order/detail/' + result.data.order_sn;
                    }, 2000);
                    dataEle.val('');
                    emailEle.val('');
                    return false;
                }

                toast('error', '', result.message);
            }
        });
    });

    const quantityInput = $('.da-quantity-input');
    $('.da-quantity-btn').on('click', function() {
        let quantity = parseInt(quantityInput.val());
        if ($(this).text() === '+') {
            quantity++;
        } else if ($(this).text() === '-' && quantity > 1) {
            quantity--;
        }
        quantityInput.val(quantity);
    });

    $('.da-buy-now-btn').click(function (){
        var email = $('#email').val(),
            quantity = $('.da-quantity-input').val(),
            title = $('.da-product-title').text(),
            price = ($('.da-product-price').text()).replace('$', ''),
            image = location.origin + $('.da-main-image').attr('src');

        if(email === ""){
            toast('error', '', '请输入接收卡密的邮箱');
            return false;
        }

        if(!validateEmail(email)){
            toast('error', '', '邮箱格式不正确');
            return false;
        }

        $.ajax({
            url:baseUrl + '/api/order/create',
            type:'post',
            dataType:'json',
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({website_id:1, name:title, image:image, price:price, email:email, quantity:quantity}),
            success:function (result){
                if(result.code === 1){
                    toast('success', '', result.message);
                    setTimeout(function (){
                        location.href = baseUrl + '/api/order/detail/' + result.data.order_sn;
                    }, 2000);
                    $('#email').val('');
                    return false;
                }

                toast('error', '', result.message);
            }
        });
    });

    // 购买按钮点击事件
    $(document).on('click', '.s-buy-button:not(:disabled)', function() {
        const card = $(this).closest('.s-country-card'),
            countryName = card.find('.s-country-name').text().replace('flag', '').trim(),
            price = card.find('.s-price').text().replace('tag', '').trim(),
            priceValue = parseFloat(price.replace('$', '')),
            balance = parseFloat(($('.s-balance-amount').text()).replace('$', '')).toFixed(2);
        if(Cookies.get('email') === undefined){
            toast('error', '', '请登录后再操作');
            showAuthModal('login');
            return false;
        }

        if(priceValue > balance){
            toast('error', '', `余额不足！当前余额: $${balance}`);
            $('#rechargeModal').addClass('active');
            $('#rechargeAmount').val(10);
            return false;
        }
    });

    // 成功接码记录数据
    const successRecords = [
    ];

    let selectedPaymentMethod = 'usdt-trc20';

    // 初始化服务搜索
    function initServiceSearch() {
        const searchInput = $('#s-service-search-input');
        const optionsContainer = $('#serviceOptions');

        // 显示所有选项
        function showAllOptions() {
            optionsContainer.empty();
            services.forEach(service => {
                const option = $(`
                            <div class="s-select-option" data-value="${service.id}">
                                <img src="${service.thumb}" alt=""> ${service.name}
                            </div>
                        `);
                optionsContainer.append(option);
            });
        }

        // 搜索功能
        function filterOptions(searchTerm) {
            optionsContainer.empty();
            const filteredServices = services.filter(service =>
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) || service.id.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredServices.length === 0) {
                optionsContainer.append('<div class="s-select-option">未找到匹配的服务</div>');
            } else {
                filteredServices.forEach(service => {
                    const option = $(`
                                <div class="s-select-option" data-value="${service.id}">
                                    <img src="${service.thumb}" alt=""> ${service.name}
                            </div>
                            `);
                    optionsContainer.append(option);
                });
            }
        }

        // 输入事件
        searchInput.on('input', function() {
            const searchTerm = $(this).val();
            if (searchTerm.length > 0) {
                filterOptions(searchTerm);
                optionsContainer.show();
            } else {
                showAllOptions();
                optionsContainer.show();
            }
        });

        // 点击选项
        optionsContainer.on('click', '.s-select-option', function() {
            const serviceId = $(this).data('value');
            const service = services.find(s => s.id === serviceId);
            if (service) {
                searchInput.val(service.name);
                optionsContainer.hide();

                // 更新服务项选中状态
                $('.s-service-item').removeClass('active');
                $(`.s-service-item[data-service="${serviceId}"]`).addClass('active');
            }
        });

        // 点击外部关闭选项
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.s-s-custom-select-container').length) {
                optionsContainer.hide();
            }
        });

        // 初始显示所有选项
        showAllOptions();
    }

    // 初始化国家卡片列表
    function initCountryCards() {
        const container = $('#countryListContainer');
        container.empty();

        countries.forEach(country => {
            const card = $(`<div class="s-country-card" data-country="${country.name}">
                <div class="s-country-info">
                    <div class="s-country-img">
                        <img src="${country.thumb}" width="64" height="64">
                    </div>
                    <div>
                        <div class="s-country-name">${country.name}</div>
                        <div class="s-country-details">
                            <div class="s-country-quantity">${country.quantity}个</div>
                            <div class="s-price">
                                <i class="fas fa-tag"></i> \$${country.price}
                            </div>
                        </div>
                    </div>
                </div>
                <button class="s-buy-button">获取号码</button>
            </div>`);
            container.append(card);
        });
    }

    // 初始化成功接码记录
    function initSuccessRecords() {
        const recordsList = $('#recordsList');
        recordsList.empty();

        successRecords.forEach(record => {
            const recordItem = $(`
                        <div class="s-record-item">
                            <div class="s-record-info">
                                <div class="s-record-service">${record.service}</div>
                                <div class="s-record-number">${record.number}</div>
                                <span class="s-record-code">${record.code}</span>
                            </div>
                            <div class="s-record-time">
                                ${record.time}
                                <div class="s-record-status">${record.status}</div>
                            </div>
                        </div>
                    `);
            recordsList.append(recordItem);
        });
    }

    // 充值弹层功能
    function initRechargeModal() {
        const modal = $('#rechargeModal');
        const rechargeBtn = $('#rechargeBtn');
        const cancelBtn = $('#cancelRecharge');
        const confirmBtn = $('#confirmRecharge');
        const amountInput = $('#rechargeAmount');

        // 打开弹层
        rechargeBtn.click(function() {
            modal.addClass('active');
            amountInput.val('');
            selectedPaymentMethod = null;
        });

        // 关闭弹层
        function closeModal() {
            modal.removeClass('active');
        }

        cancelBtn.click(closeModal);

        modal.click(function(e) {
            if (e.target === modal[0]) {
                closeModal();
            }
        });

        $('.s-payment-method').click(function() {
            if ($(this).hasClass('disabled')) {
                toast('error', '', '支付方式暂时维护中，请选择其他支付方式');
                return false;
            }

            $('.s-payment-method').removeClass('active');
            $(this).addClass('active');
            selectedPaymentMethod = $(this).data('method');
        });

        // 确认充值
        confirmBtn.click(function() {
            const amount = parseFloat(amountInput.val());
            if (!amount || amount < 5) {
                toast('error', '', '请输入至少5USD的充值金额');
                return;
            }

            if (!selectedPaymentMethod) {
                toast('error', '', '请选择支付方式');
                return;
            }

            if(Cookies.get('email') === undefined){
                toast('error', '', '请登录后再操作');
                return;
            }

            $.ajax({
                url:baseUrl + '/api/order/create',
                type:'post',
                dataType:'json',
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify({website_id:3, name:'账户充值', price:amount, email:Cookies.get('email'), token:Cookies.get('token'), quantity:1}),
                success:function (result){
                    if(result.code === 1){
                        toast('success', '', result.message);
                        setTimeout(function (){
                            location.href = baseUrl + '/api/order/detail/' + result.data.order_sn;
                        }, 2000);
                        return false;
                    }

                    toast('error', '', result.message);
                }
            });

            closeModal();
        });
    }

    // 服务项点击事件
    $('.s-service-item').click(function() {
        const service = $(this).data('service');
        $('.s-service-item').removeClass('active');
        $(this).addClass('active');

        // 更新搜索框
        const serviceData = services.find(s => s.id === service);
        if (serviceData) {
            $('#s-service-search-input').val(serviceData.name);
        }
    });

    // 国家搜索功能
    $('#sms-country-search').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        const countryCards = $('.s-country-card');

        countryCards.each(function() {
            const countryName = $(this).data('country').toLowerCase();
            if (countryName.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // 选项卡切换功能
    function switchtab(tabName) {
        // 更新选项卡
        $('.s-tab').removeClass('active');
        $(`.s-tab[data-s-tab="${tabName}"]`).addClass('active');

        // 更新状态卡片
        $('.status-card').removeClass('active');
        $(`.status-card[data-s-tab="${tabName}"]`).addClass('active');

        // 控制服务区域显示
        const serviceSection = $('#serviceSection');
        if (tabName === 'rent') {
            serviceSection.addClass('hidden');
        } else {
            serviceSection.removeClass('hidden');
        }
    }

    // 选项卡点击事件
    $('.s-tab').click(function() {
        const tabName = $(this).data('s-tab');
        switchtab(tabName);
    });

    initServiceSearch();
    initCountryCards();
    initSuccessRecords();
    initRechargeModal();
    switchtab('sms');
});

