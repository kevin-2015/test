/**
 * @author Administrator
 */
var footer ='<div class="ub ub-ac foot_type c_5fa font_01"  style="margin-top:1em;width: 100%;">'
        	
            +'<div class="foot_lef foot_tip umar_l04"></div>'
		   +' <div class="ub-f1 tx-c" onclick="login_tcl()" id="login_tcl" style="color:#fff;">登录我的TCL</div>'
		    +' <div class="uhide" id="login_user" onclick="window.location.href=\'zhy_center.html\'" style="color:#fff;">TCL欢迎您: <span id="user_name"></span></div>'
			 +' <div class="ub-f1 tx-c" onclick="myScroll()" id="login_top" style="color:#fff;">返回顶部</div>'
            +'<div class="foot_rit foot_tip umar_r04"></div>'
          
      +'  </div><div class="ub footer font_09" style="width: 100%;">'
        +'<div class="ub-f1 c_f4f tx-c uinn_a3 mar_l02" onClick="open_new(\'contact\')">'
        	+'<div class="ub ub-pc"><div class="contact_icon"></div></div>'
			+'<div class="">联系我们</div>'
        +'</div>'
       +' <div class="ub-f1 c_f4f tx-c uinn_a3 mar_l02" onClick="open_new(\'language\')">'
        	+'<div class="ub ub-pc"><div class="language_icon"></div></div>'
			+'<div class="">语言选择</div>'
       +' </div>'
        +'<div class="ub-f1 c_f4f tx-c uinn_a3 mar_l02" onClick="open_new(\'about\')">'	
        	+'<div class="ub ub-pc"><div class="mtcl_icon"></div></div>'
			+'<div class="">关于我们</div>'
      +'  </div>'
	  +'<div class="ub-f1 tx-c c_f4f uinn_a3 mar_l02" onclick="open_leftwin()">'
        	+'<div class="ub ub-pc"><div class="see_icon"></div></div>'
			+'<div id="atten_our" class="atten_our">关注我们</div>'
       +' </div>'
    +'</div>';
document.write(footer);
