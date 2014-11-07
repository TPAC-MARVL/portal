(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['admin-group-create'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form id='commonForm' role=\"form\" action=\"";
  if (helper = helpers.post_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"post\">\r\n    \r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n          <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"glyphicon glyphicon-ok\"></span>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n        </div>\r\n        <div class=\"modal-body\">      \r\n          <div class=\"form-group\">\r\n            <label for=\"group_name\">Name (Max 20 characters)</label>\r\n            <input class=\"form-control\" id=\"group_name\" name=\"group_name\" placeholder=\"Enter name\" data-bv-notempty=\"true\" maxlength=\"20\" data-bv-notempty-message=\"The name field is required and cannot be empty\">\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"group_desc\">Description (Max 100 characters)</label>\r\n            <textarea id=\"group_desc\" name=\"group_description\" class=\"form-control\" placeholder=\"Entet description\" rows=\"5\" maxlength=\"100\" data-bv-notempty=\"true\" data-bv-notempty-message=\"The description field is required and cannot be empty\"></textarea>\r\n          </div>\r\n          <div class=\"checkbox\">\r\n            <label>\r\n              <input name=\"group_default\" type=\"checkbox\">Default Group\r\n            </label>\r\n          </div>\r\n        </div>\r\n        \r\n        <div class=\"modal-footer\">\r\n          <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"";
  if (helper = helpers.csrf_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csrf_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">submit</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n </form>\r\n \r\n  <script>\r\n $(document).ready(function() {\r\n    $('#commonForm').bootstrapValidator();\r\n });\r\n </script>";
  return buffer;
  });
templates['admin-group-edit-instance'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\r\n             <span class=\"warning-sign glyphicon glyphicon-warning-sign\"></span>  \r\n          ";
  }

function program3(depth0,data) {
  
  
  return "\r\n             <span class=\"glyphicon glyphicon-ok\"></span>\r\n          ";
  }

function program5(depth0,data) {
  
  
  return "\r\n            <span class=\"glyphicon glyphicon-ok\"></span>\r\n          ";
  }

function program7(depth0,data) {
  
  
  return "\r\n                 remove instance from group\r\n               ";
  }

function program9(depth0,data) {
  
  
  return "\r\n                 assign a new group to instance \r\n               ";
  }

function program11(depth0,data) {
  
  
  return "\r\n                 remove a group from instance  \r\n               ";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	                     <tr>\r\n				         <td class=\"modal-check-box\">\r\n				              ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				              ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.delete_view), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				         </td>\r\n	                     <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n	                     </td>\r\n	                   </tr>\r\n	                 ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "	           \r\n				                  <input type=\"checkbox\" name=\"group_ids\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\r\n				              ";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n				                  <input type=\"hidden\" name=\"group_ids\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />    \r\n				              ";
  return buffer;
  }

  buffer += "<form role=\"form\" action=\"";
  if (helper = helpers.post_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"post\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n                    \r\n          <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.delete_view), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          \r\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          \r\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          \r\n          ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>        \r\n        \r\n        </div>\r\n        <div class=\"modal-body\">      \r\n           <div class=\"modal-header-box\">\r\n               \r\n               You are going to \r\n               ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.delete_view), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n               \r\n               ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n               \r\n               ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                \r\n               <span class=\"warning-sign\">(";
  if (helper = helpers.instance_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.instance_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ")</span>.\r\n           </div>\r\n          \r\n           <div class=\"add-member-box\">\r\n	           <table class=\"table table-striped table-hover\" id=\"admin-groups-list-table\">\r\n	              <thead>\r\n				    <tr class=\"table-header\">\r\n				        <td></td>\r\n				      <td>Name</td>	    \r\n				    </tr>\r\n				  </thead>\r\n	              <tbody>\r\n	                 ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.groups), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	              </tbody>\r\n			    </table>\r\n		    </div>		    \r\n        </div>\r\n        \r\n        <div class=\"modal-footer\">\r\n          <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"";
  if (helper = helpers.csrf_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csrf_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <input type=\"hidden\" name=\"instance_id\" value=\"";
  if (helper = helpers.instance_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.instance_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">submit</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n </form>";
  return buffer;
  });
templates['admin-group-edit-member'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\r\n             <span class=\"warning-sign glyphicon glyphicon-warning-sign\"></span>  \r\n          ";
  }

function program3(depth0,data) {
  
  
  return "\r\n             <span class=\"glyphicon glyphicon-ok\"></span>\r\n          ";
  }

function program5(depth0,data) {
  
  
  return "\r\n            <span class=\"glyphicon glyphicon-ok\"></span>\r\n          ";
  }

function program7(depth0,data) {
  
  
  return "\r\n                 remove members from group\r\n               ";
  }

function program9(depth0,data) {
  
  
  return "\r\n                 add members to group  \r\n               ";
  }

function program11(depth0,data) {
  
  
  return "\r\n                 add or remove admins from group  \r\n               ";
  }

function program13(depth0,data) {
  
  
  return "\r\n				      \r\n				      ";
  }

function program15(depth0,data) {
  
  
  return "\r\n				        <td></td>\r\n				      ";
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	                   <tr>\r\n	                      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	                     <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n	                         ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	                     </td>\r\n	                     <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.email)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n	                     <td class=\"group-admin-select\">\r\n	                      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.delete_view), {hash:{},inverse:self.program(29, program29, data),fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	                     </td>\r\n	                   </tr>\r\n	                 ";
  return buffer;
  }
function program18(depth0,data) {
  
  
  return "\r\n				      \r\n				          ";
  }

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n				            <td><input type=\"checkbox\" name=\"member_ids\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" /></td>\r\n				         \r\n	                      ";
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	                           <input hidden type=\"checkbox\" name=\"member_ids\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" checked=\"checked\" />\r\n	                         ";
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	                       ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_group_admin), {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	                     ";
  return buffer;
  }
function program25(depth0,data) {
  
  
  return "\r\n	                         yes\r\n	                       ";
  }

function program27(depth0,data) {
  
  
  return "  \r\n	                         no\r\n	                       ";
  }

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	                         ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.program(35, program35, data),fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	                     ";
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	                            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_group_admin), {hash:{},inverse:self.program(33, program33, data),fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	                         ";
  return buffer;
  }
function program31(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	                              <input type=\"checkbox\" name=\"group_admins\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" checked=\"checked\" />\r\n	                            ";
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "  \r\n	                              <input type=\"checkbox\" name=\"group_admins\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\r\n	                            ";
  return buffer;
  }

function program35(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	                              <input type=\"checkbox\" name=\"group_admins\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" /> \r\n	                         ";
  return buffer;
  }

  buffer += "<form role=\"form\" action=\"";
  if (helper = helpers.post_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"post\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n                    \r\n          <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.delete_view), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          \r\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          \r\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                      \r\n          ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>        \r\n        \r\n        </div>\r\n        <div class=\"modal-body\">      \r\n           <div class=\"modal-header-box\">\r\n               \r\n               You are going to \r\n               ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.delete_view), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n               \r\n               ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n               \r\n               ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                \r\n               <span class=\"warning-sign\">(";
  if (helper = helpers.group_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ")</span>.\r\n           </div>\r\n          \r\n           <div class=\"add-member-box\">\r\n	           <table class=\"table table-striped table-hover\" id=\"admin-groups-list-table\">\r\n	              <thead>\r\n				    <tr class=\"table-header\">\r\n				      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				      \r\n				      <td>Name</td>\r\n				      <td>Email</td>\r\n		              <td>Group Admin?</td>				    \r\n				    </tr>\r\n				  </thead>\r\n	              <tbody>\r\n	                 ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	              </tbody>\r\n			    </table>\r\n		    </div>		    \r\n        </div>\r\n        \r\n        <div class=\"modal-footer\">\r\n          <input type=\"hidden\" name=\"page_token\" value=\"";
  if (helper = helpers.page_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.page_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"";
  if (helper = helpers.csrf_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csrf_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <input type=\"hidden\" name=\"group_id\" value=\"";
  if (helper = helpers.group_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">submit</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n </form>";
  return buffer;
  });
templates['admin-group-edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form id='commonForm' role=\"form\" action=\"";
  if (helper = helpers.post_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"post\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n          <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"glyphicon glyphicon-ok\"></span>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n        </div>\r\n        <div class=\"modal-body\">      \r\n          <div class=\"form-group\">\r\n            <label for=\"form_group_name\">Name (Max 20 characters)</label>\r\n            <input class=\"form-control\" id=\"form_group_name\" name=\"group_name\" placeholder=\"Enter name\" value=\"";
  if (helper = helpers.group_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-bv-notempty=\"true\" maxlength=\"20\" data-bv-notempty-message=\"The name field is required and cannot be empty\">\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"form_group_desc\">Description (Max 100 characters)</label>\r\n             <textarea id=\"group_desc\" name=\"group_description\" class=\"form-control\" placeholder=\"Enter description\" rows=\"5\" value=\"";
  if (helper = helpers.group_description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group_description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-bv-notempty=\"true\" maxlength=\"100\" data-bv-notempty-message=\"The description field is required and cannot be empty\">";
  if (helper = helpers.group_description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group_description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\r\n          </div>\r\n        </div>\r\n        \r\n        <div class=\"modal-footer\">\r\n          <input type=\"hidden\" name=\"page_token\" value=\"";
  if (helper = helpers.page_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.page_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"";
  if (helper = helpers.csrf_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csrf_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <input type=\"hidden\" name=\"group_id\" value=\"";
  if (helper = helpers.group_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">submit</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n </form>\r\n \r\n <script>\r\n $(document).ready(function() {\r\n    $('#commonForm').bootstrapValidator();\r\n });\r\n </script>";
  return buffer;
  });
templates['admin-group-list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td class=\"select-field\">\r\n\r\n<input type=\"checkbox\" name=\"group\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n  \r\n</td>\r\n\r\n<td><a href=\"/marvl/groups/view/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" title=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a> <div hidden id=\"group_name";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div><div hidden id=\"group_description";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div></td>\r\n<td>";
  if (helper = helpers.group_admin) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group_admin); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.total_members) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.total_members); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.total_models) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.total_models); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.created) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.created); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>";
  return buffer;
  });
templates['admin-group-rename'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form role=\"form\" action=\"/marvl/groups/admin/rename_group\" method=\"post\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n          <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"glyphicon glyphicon-ok\"></span>Create New Group</h4>\r\n        </div>\r\n        <div class=\"modal-body\">      \r\n          <div class=\"form-group\">\r\n            <label for=\"group_name\">Name</label>\r\n            <input class=\"form-control\" id=\"group_name\" name=\"group_name\" placeholder=\"Enter name\">\r\n          </div>\r\n        </div>\r\n        \r\n        <div class=\"modal-footer\">        \r\n          <input type=\"hidden\" name=\"page_token\" value=\"";
  if (helper = helpers.page_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.page_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"";
  if (helper = helpers.csrf_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csrf_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">submit</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n </form>";
  return buffer;
  });
templates['admin-instance-edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n               <input class=\"form-control\" id=\"instance_name\" name=\"instance_name\" placeholder=\"Enter Name\" value=\"";
  if (helper = helpers.instance_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.instance_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-bv-notempty=\"true\" maxlength=\"30\" data-bv-notempty-message=\"The name field is required and cannot be empty\">       \r\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\r\n              <input class=\"form-control\" id=\"instance_name\" name=\"instance_name\" placeholder=\"Enter Name\" data-bv-notempty=\"true\" maxlength=\"30\" data-bv-notempty-message=\"The name field is required and cannot be empty\">\r\n            ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n              <input class=\"form-control\" id=\"instance_ip\" name=\"instance_ip\" value=\"";
  if (helper = helpers.instance_ip) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.instance_ip); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-bv-notempty=\"true\" data-bv-notempty-message=\"The ip field is required and cannot be empty\" maxlength=\"15\">       \r\n            ";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "\r\n              <input class=\"form-control\" id=\"instance_ip\" name=\"instance_ip\" placeholder=\"Entet IP\" type=\"ip\" data-bv-ip-message=\"the IP is not valid\" data-bv-notempty=\"true\" data-bv-notempty-message=\"The ip field is required and cannot be empty\" maxlength=\"15\">\r\n            ";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n               <input class=\"form-control\" id=\"instance_url\" name=\"instance_url\" placeholder=\"Entet URL\" value=\"";
  if (helper = helpers.instance_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.instance_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" type=\"url\" data-bv-uri-message=\"The url is not valid\" data-bv-notempty=\"true\" data-bv-notempty-message=\"The url field is required and cannot be empty\">         \r\n            ";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\r\n               <input class=\"form-control\" id=\"instance_url\" name=\"instance_url\" placeholder=\"Entet URL\" type=\"url\" data-bv-uri-message=\"The url is not valid\" data-bv-notempty=\"true\" data-bv-notempty-message=\"The url field is required and cannot be empty\">     \r\n            ";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_state)),stack1 == null || stack1 === false ? stack1 : stack1.running), {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                \r\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_state)),stack1 == null || stack1 === false ? stack1 : stack1.stopped), {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n              ";
  return buffer;
  }
function program14(depth0,data) {
  
  
  return "\r\n                   <option value=\"running\" selected=\"selected\">running</option> \r\n                ";
  }

function program16(depth0,data) {
  
  
  return "\r\n                  <option value=\"running\">running</option>\r\n                ";
  }

function program18(depth0,data) {
  
  
  return "\r\n                   <option value=\"stopped\" selected=\"selected\">stopped</option>\r\n                ";
  }

function program20(depth0,data) {
  
  
  return "\r\n                   <option value=\"stopped\">stopped</option>\r\n                ";
  }

function program22(depth0,data) {
  
  
  return "\r\n                <option value=\"running\">running</option>\r\n                <option value=\"stopped\">stopped</option>\r\n              ";
  }

function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_type)),stack1 == null || stack1 === false ? stack1 : stack1.small), {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                \r\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_type)),stack1 == null || stack1 === false ? stack1 : stack1.large), {hash:{},inverse:self.program(31, program31, data),fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n              ";
  return buffer;
  }
function program25(depth0,data) {
  
  
  return "\r\n                   <option value=\"m1.small\" selected=\"selected\">small</option> \r\n                ";
  }

function program27(depth0,data) {
  
  
  return "\r\n                  <option value=\"m1.small\">small</option>\r\n                ";
  }

function program29(depth0,data) {
  
  
  return "\r\n                   <option value=\"m1.xlarge\" selected=\"selected\">large</option>\r\n                ";
  }

function program31(depth0,data) {
  
  
  return "\r\n                   <option value=\"m1.xlarge\">large</option>\r\n                ";
  }

function program33(depth0,data) {
  
  
  return "\r\n                <option value=\"m1.small\">small</option>\r\n                <option value=\"m1.xlarge\">large</option>\r\n              ";
  }

function program35(depth0,data) {
  
  
  return "\r\n                        <input type=\"radio\"  name=\"instance_visibility\" value=\"public\" data-bv-notempty=\"true\" data-bv-notempty-message=\"The visibility field is required and cannot be empty\" />\r\n                     ";
  }

function program37(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n              \r\n                       ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.instance_public), {hash:{},inverse:self.program(40, program40, data),fn:self.program(38, program38, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                      ";
  return buffer;
  }
function program38(depth0,data) {
  
  
  return "\r\n                         <input type=\"radio\" name=\"instance_visibility\" value=\"public\" checked=\"checked\" data-bv-notempty=\"true\" data-bv-notempty-message=\"The visibility field is required and cannot be empty\" />\r\n                       ";
  }

function program40(depth0,data) {
  
  
  return "\r\n                         <input type=\"radio\" name=\"instance_visibility\" value=\"public\" data-bv-notempty=\"true\" data-bv-notempty-message=\"The visibility field is required and cannot be empty\" />\r\n                       ";
  }

function program42(depth0,data) {
  
  
  return "\r\n                      <input type=\"radio\" name=\"instance_visibility\" value=\"private\" data-bv-notempty=\"true\" data-bv-notempty-message=\"The visibility field is required and cannot be empty\" />\r\n                    ";
  }

function program44(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n              \r\n                       ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.instance_public), {hash:{},inverse:self.program(47, program47, data),fn:self.program(45, program45, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                      ";
  return buffer;
  }
function program45(depth0,data) {
  
  
  return "\r\n                         <input type=\"radio\" name=\"instance_visibility\" value=\"private\" data-bv-notempty=\"true\" data-bv-notempty-message=\"The visibility field is required and cannot be empty\" />       \r\n                       ";
  }

function program47(depth0,data) {
  
  
  return "\r\n                         <input type=\"radio\" name=\"instance_visibility\" value=\"private\" checked=\"checked\" data-bv-notempty=\"true\" data-bv-notempty-message=\"The visibility field is required and cannot be empty\" />\r\n                       ";
  }

function program49(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <input type=\"hidden\" id=\"instance_id\" name=\"instance_id\" value=\"";
  if (helper = helpers.instance_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.instance_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          ";
  return buffer;
  }

  buffer += "<form id=\"commonForm\" role=\"form\" action=\"";
  if (helper = helpers.post_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"post\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n          <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"glyphicon glyphicon-ok\"></span>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n        </div>\r\n        <div class=\"modal-body\">      \r\n          <div class=\"form-group\">\r\n            <label for=\"instance_name\">Name (Max 30 characters)</label>\r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            \r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"instance_ip\">IP (123.123.123.123)</label>\r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            \r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"instance_url\">URL (http://example.com)</label>\r\n            \r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            \r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "           \r\n          \r\n          </div>\r\n          \r\n          <div class=\"form-group\">\r\n            <label for=\"instance_state\">State</label>\r\n            <select id=\"instance_state\" class=\"form-control\" name=\"instance_state\" data-bv-notempty=\"true\">\r\n              ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n              ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </select>\r\n          </div>\r\n          \r\n          <div class=\"form-group\">\r\n            <label for=\"instance_type\">Type</label>\r\n            <select id=\"instance_type\" class=\"form-control\" name=\"instance_type\" data-bv-notempty=\"true\">\r\n              ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n              ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(33, program33, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </select>\r\n          </div>\r\n          \r\n            <div class=\"form-group\">\r\n                  <label for=\"instance_visibility\">Shared?</label>\r\n              \r\n                  <div class=\"radio\">                \r\n                     ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                     \r\n                      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(37, program37, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                     Public\r\n                  </div>\r\n                  <div class=\"radio\">\r\n                    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(42, program42, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                    \r\n                       ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(44, program44, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                      Private\r\n                  </div>     \r\n            </div>\r\n        </div>\r\n        \r\n        \r\n        <div class=\"modal-footer\">\r\n          <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"";
  if (helper = helpers.csrf_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csrf_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(49, program49, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          <button type=\"submit\" class=\"btn btn-primary\">submit</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n </form>\r\n \r\n  <script>\r\n $(document).ready(function() {\r\n    $('#commonForm').bootstrapValidator({\r\n        fields:{\r\n          instance_ip: {\r\n            validators: {\r\n                ip:{\r\n                  message: 'The ip field is not valid',\r\n                  ipv4: true,\r\n                  ipv6: false,\r\n                }\r\n            }           \r\n          }\r\n        }\r\n    });\r\n });\r\n </script>";
  return buffer;
  });
templates['admin-instance-list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td class=\"select-field\">\r\n<input type=\"checkbox\" name=\"instance\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n</td>\r\n\r\n<td><a href=\"/marvl/instances/view/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" title=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a> <div hidden id=\"instance_name_value";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div></td>\r\n<td>";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " <div hidden id=\"instance_type_value";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div></td>\r\n<td>";
  if (helper = helpers.state) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.state); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " <div hidden id=\"instance_state_value";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.state) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.state); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div></td>\r\n<td>";
  if (helper = helpers.created) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.created); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.group) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.ip) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ip); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " <div hidden id=\"instance_ip_value";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.ip) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ip); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div></td>\r\n<td>";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " <div hidden id=\"instance_url_value";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div></td>\r\n<td>";
  if (helper = helpers.visibility) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.visibility); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " <div hidden id=\"instance_visibility_value";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.visibility) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.visibility); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div></td>";
  return buffer;
  });
templates['admin-instance-remove'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += " \r\n               "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "  \r\n             ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n             <input hidden type=\"checkbox\" name=\"instance_ids\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" checked />\r\n          ";
  return buffer;
  }

  buffer += "<form role=\"form\" action=\"";
  if (helper = helpers.post_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"post\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n          <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"glyphicon glyphicon-ok\"></span>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n        </div>\r\n        \r\n        <div class=\"modal-body\">\r\n          <div class=\"modal-header-box\">\r\n            These virtual machines <span class=\"warning-sign\">(\r\n             ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.item_names), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            )\r\n            \r\n            </span> \r\n            \r\n              will be removed from the system.\r\n\r\n          </div>\r\n          <div class=\"modal-warning-box\">\r\n            <span class=\"confirm-sign glyphicon glyphicon-hand-right\"></span> Are you sure?\r\n          </div>\r\n        </div>\r\n        \r\n        <div class=\"modal-footer\">\r\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.item_ids), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"";
  if (helper = helpers.csrf_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csrf_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">submit</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n </form>";
  return buffer;
  });
templates['admin-model-request-form-edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\r\n             <span class=\"warning-sign glyphicon glyphicon-warning-sign\"></span>  \r\n          ";
  }

function program3(depth0,data) {
  
  
  return "\r\n             <span class=\"glyphicon glyphicon-ok\"></span>\r\n          ";
  }

function program5(depth0,data) {
  
  
  return "\r\n                  reject the model requests\r\n               ";
  }

function program7(depth0,data) {
  
  
  return "\r\n                  approve the model requests  \r\n               ";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                     "
    + escapeExpression(((stack1 = (depth0 && depth0.display_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n                   ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	              \r\n	                 <tr>\r\n	                   <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.display_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n	                   <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n	                   <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.createdBy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n	                 </tr>\r\n	                 \r\n	                  ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n             <input type=\"hidden\" name=\"request_ids[]\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n             <input type=\"hidden\" name=\"request_modified_times[]\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.modifiedTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n           ";
  return buffer;
  }

  buffer += "<form role=\"form\" action=\"";
  if (helper = helpers.post_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"post\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n                    \r\n          <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.reject_view), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          \r\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.approve_view), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                      \r\n          ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>        \r\n        \r\n        </div>\r\n        <div class=\"modal-body\">   \r\n           \r\n           <div class=\"modal-header-box\">\r\n               \r\n               You are going to \r\n               ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.reject_view), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n               \r\n               ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.approve_view), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "               \r\n                \r\n               <span class=\"warning-sign\">(\r\n                \r\n                   ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.requests), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                \r\n                )</span>.\r\n           </div>\r\n          \r\n           <div class=\"add-member-box\">\r\n	           \r\n	           <table class=\"table table-striped table-hover\" id=\"admin-groups-list-table\">\r\n	              <thead>\r\n				    <tr class=\"table-header\">				      \r\n				      <td>Request Id</td>\r\n				      <td>Type</td>\r\n		              <td>Submitted By</td>	    \r\n				    </tr>\r\n				  </thead>\r\n	              <tbody>\r\n	                  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.requests), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	              </tbody>\r\n			    </table>\r\n			    \r\n		\r\n			    \r\n		    </div>\r\n		    \r\n		    	<div>\r\n			      <label for=\"notes\">Notes</label>\r\n                  <textarea id=\"notes\" name=\"notes\" class=\"form-control\" rows=\"5\"></textarea>\r\n			    </div>    \r\n        </div>\r\n        \r\n        <div class=\"modal-footer\">\r\n          <input type=\"hidden\" name=\"page_token\" value=\"";
  if (helper = helpers.page_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.page_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"";
  if (helper = helpers.csrf_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csrf_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          \r\n           ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.requests), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n           \r\n          <button type=\"submit\" class=\"btn btn-primary\">submit</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n </form>";
  return buffer;
  });
templates['admin-user-edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += " \r\n               "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "  \r\n             ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\r\n              will be added as system admins.\r\n            ";
  }

function program5(depth0,data) {
  
  
  return "\r\n              will be removed from system admins.\r\n            ";
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n             <input hidden type=\"checkbox\" name=\"user_ids\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" checked />\r\n          ";
  return buffer;
  }

  buffer += "<form role=\"form\" action=\"";
  if (helper = helpers.post_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"post\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n          <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"glyphicon glyphicon-ok\"></span>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n        </div>\r\n        \r\n        <div class=\"modal-body\">\r\n          <div class=\"modal-header-box\">\r\n            These users <span class=\"warning-sign\">(\r\n             ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.item_names), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            )\r\n            \r\n            </span> \r\n            \r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            \r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.delete_view), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n          </div>\r\n          <div class=\"modal-warning-box\">\r\n            <span class=\"confirm-sign glyphicon glyphicon-hand-right\"></span> Are you sure?\r\n          </div>\r\n        </div>\r\n        \r\n        <div class=\"modal-footer\">\r\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.item_ids), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"";
  if (helper = helpers.csrf_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csrf_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">submit</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n </form>";
  return buffer;
  });
templates['admin-user-list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td class=\"select-field\">\r\n<input type=\"checkbox\" name=\"user\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n</td>\r\n\r\n<td>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "<div hidden id=\"user_name_value";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div></td>\r\n<td>";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.organization) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.organization); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.is_system_admin) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.is_system_admin); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.aaf) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.aaf); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.groups) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.groups); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>";
  return buffer;
  });
templates['admin-user-map-edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n               <input class=\"form-control\" id=\"email\" name=\"email\" value=\"";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\r\n               <input class=\"form-control\" id=\"email\" name=\"email\" placeholder=\"Enter Email\">    \r\n            ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n               \r\n              ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                  <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" selected=\"selected\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\r\n                ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                  <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\r\n                ";
  return buffer;
  }

function program10(depth0,data) {
  
  
  return "\r\n                    <input name=\"is_admin\" type=\"checkbox\" checked=\"checked\">\r\n                  ";
  }

function program12(depth0,data) {
  
  
  return "\r\n                     <input name=\"is_admin\" type=\"checkbox\">\r\n                  ";
  }

  buffer += "<form role=\"form\" action=\"";
  if (helper = helpers.post_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"post\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n          <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"glyphicon glyphicon-ok\"></span>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n        </div>\r\n        <div class=\"modal-body\">      \r\n          \r\n          <div class=\"form-group\">\r\n            \r\n            <label for=\"email\">Email</label>\r\n            \r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.edit_view), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            \r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.view_type)),stack1 == null || stack1 === false ? stack1 : stack1.insert_view), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    \r\n          \r\n          </div>\r\n          \r\n          <div class=\"form-group\">      \r\n            <select id=\"group_id\" name=\"group_id\" class=\"form-control\">\r\n			  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.groups), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		    </select>\r\n		   </div>\r\n		   \r\n            <div class=\"checkbox\">\r\n              <label>\r\n                 ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_admin), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                  \r\n                  Is Admin\r\n              </label>\r\n             </div>           \r\n          \r\n        </div>\r\n        \r\n        <div class=\"modal-footer\">\r\n          <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"";
  if (helper = helpers.csrf_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csrf_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <input type=\"hidden\" name=\"map_id\" value=\"";
  if (helper = helpers.map_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.map_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">submit</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n </form>";
  return buffer;
  });
templates['admin-user-map-list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n      <input type=\"checkbox\" name=\"map\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n    ";
  return buffer;
  }

  buffer += "<td class=\"select-field\">\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.show_checkbox), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  \r\n</td>\r\n<td>";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " <div hidden id=\"email";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div></td>\r\n<td>";
  if (helper = helpers.group) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " <div hidden id=\"group_id";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.group_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div></td>\r\n<td>";
  if (helper = helpers.is_admin) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.is_admin); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " <div hidden id=\"is_admin";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.is_admin) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.is_admin); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div></td>\r\n<td>";
  if (helper = helpers.proved) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.proved); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.created) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.created); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.creator) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.creator); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>";
  return buffer;
  });
templates['application-button'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n    <div class=\"button\">\r\n      <span class=\"glyphicon ";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span>\r\n      ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n    </div>";
  return buffer;
  });
templates['message-list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "  <td>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td>";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td>";
  if (helper = helpers.sentTo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.sentTo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td> \r\n  <td>";
  if (helper = helpers.createdBy) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.createdBy); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td>";
  if (helper = helpers.createdTime) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.createdTime); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  ";
  return buffer;
  });
templates['message-send'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n			    <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\r\n	          ";
  return buffer;
  }

  buffer += "<form role=\"form\" action=\"";
  if (helper = helpers.post_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"post\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n          <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"glyphicon glyphicon-ok\"></span>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n        </div>\r\n        <div class=\"modal-body\">      \r\n          <div class=\"form-group\">\r\n            <label for=\"message_title\">Title</label>\r\n            <input class=\"form-control\" id=\"message_title\" name=\"message_title\" placeholder=\"Enter title\">\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"message_content\">Content</label>\r\n            <textarea id=\"message_content\" name=\"message_content\" class=\"form-control\" rows=\"6\" placeholder=\"Entet content\"></textarea>\r\n          </div>\r\n          \r\n          <div class=\"radio\">\r\n			  <label>\r\n			    <input type=\"radio\" name=\"sendOption\" id=\"sendOption1\" value=\"member\" checked>\r\n			    Send to members\r\n			  </label>\r\n		  </div>\r\n		  \r\n		  <div class=\"radio\">\r\n			  <label>\r\n			    <input type=\"radio\" name=\"sendOption\" id=\"sendOption2\" value=\"group\">\r\n			    Send to groups\r\n			  </label>\r\n		  </div>\r\n          \r\n           <div id=\"message_members\" class=\"form-group\">\r\n            <select multiple name=\"member_ids\" class=\"form-control\">\r\n			  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</select>\r\n           </div>\r\n           \r\n           <div id=\"message_groups\" class=\"form-group hidden\">\r\n            <select multiple name=\"group_ids\" class=\"form-control\">\r\n			  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.groups), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</select>\r\n           </div>\r\n        </div>\r\n        \r\n        <div class=\"modal-footer\">\r\n          <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"";
  if (helper = helpers.csrf_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csrf_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">Send</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n </form>";
  return buffer;
  });
templates['modal-warning'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n   <div class=\"modal-header-box\">\r\n     ";
  if (helper = helpers.message1) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message1); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n   </div>\r\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n   <div class=\"modal-warning-box\">\r\n     <span class=\"confirm-sign glyphicon glyphicon-hand-right\"></span> ";
  if (helper = helpers.message2) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message2); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " \r\n   </div>\r\n  ";
  return buffer;
  }

  buffer += "<div class=\"modal-header\">\r\n  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n  <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"warning-sign glyphicon glyphicon-warning-sign\"></span>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n</div>\r\n   \r\n<div class=\"modal-body\">\r\n  \r\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.message1), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  \r\n\r\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.message2), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \r\n\r\n</div>\r\n\r\n<div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>  \r\n</div>";
  return buffer;
  });
templates['model-request-details-modal'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal fade\" id=\"modelRequestViewModal";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"model-request-details-modal\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n        <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"glyphicon glyphicon-ok\"></span>Request Details</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div><span class=\"modal-text-header\">Request Id:</span><span class=\"modal-text-field\">";
  if (helper = helpers.request_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.request_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n        <div><span class=\"modal-text-header\">Description:</span><span class=\"modal-text-field\">";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n        <div><span class=\"modal-text-header\">Type:</span><span class=\"modal-text-field\">";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n        <div><span class=\"modal-text-header\">Status:</span><span class=\"modal-text-field\">";
  if (helper = helpers.status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n        <div><span class=\"modal-text-header\">Notes:</span><span class=\"modal-text-field\">";
  if (helper = helpers.notes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.notes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n        <div><span class=\"modal-text-header\">Created Time:</span><span class=\"modal-text-field\">";
  if (helper = helpers.createdTime) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.createdTime); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n      </div>\r\n      \r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\r\n      </div>\r\n    </div><!-- /.modal-content -->\r\n  </div><!-- /.modal-dialog -->\r\n</div>";
  return buffer;
  });
templates['model-request-form'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\r\n              ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\r\n              ";
  return buffer;
  }

  buffer += "<form id=\"commonForm\" role=\"form\" action=\"";
  if (helper = helpers.post_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"post\">\r\n    \r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n                    \r\n          <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n             <span class=\"glyphicon glyphicon-ok\"></span>\r\n             ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n          </h4>\r\n        </div>\r\n        \r\n        <div class=\"modal-body\"> \r\n          <div class=\"form-group\">    \r\n            <label for=\"description\">Description (Max 300 characters)</label>\r\n            <textarea id=\"description\" name=\"description\" class=\"form-control\" placeholder=\"Entet description\" rows=\"5\" maxlength=\"300\" data-bv-notempty=\"true\" data-bv-notempty-message=\"The description field is required and cannot be empty\"></textarea> \r\n          </div>\r\n          \r\n          <div class=\"form-group\">\r\n          <label for=\"model_type\">Type</label>\r\n          <select id=\"model_type\" name=\"model_type\" class=\"form-control\" data-bv-notempty=\"true\">\r\n			  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instance_types), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		  </select>\r\n		  </div>\r\n		  \r\n		  <div class=\"form-group\">\r\n		  <label for=\"model_type\">Assigned To</label>\r\n		  <select id=\"group_id\" name=\"group_id\" class=\"form-control\" data-bv-notempty=\"true\">\r\n			  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.groups), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		  </select>\r\n		  </div>		  		  \r\n        </div>\r\n        \r\n        <div class=\"modal-footer\">\r\n          <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"";
  if (helper = helpers.csrf_token) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csrf_token); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">submit</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n </form>\r\n \r\n <script>\r\n $(document).ready(function() {\r\n    $('#commonForm').bootstrapValidator();\r\n });\r\n </script>";
  return buffer;
  });
templates['model-request-list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n      <input type=\"checkbox\" name=\"request\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <td>";
  if (helper = helpers.createdBy) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.createdBy); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n      <div hidden id=\"request_created_by";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.createdBy) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.createdBy); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>  \r\n    </td>\r\n  ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <td>";
  if (helper = helpers.changedBy) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.changedBy); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n      <div hidden id=\"modified_time";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.modifiedTime) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.modifiedTime); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n      <div hidden id=\"request_changed_by";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.changedBy) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.changedBy); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n    </td>\r\n  ";
  return buffer;
  }

  buffer += "  <td class=\"select-field\">\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.show_checkbox), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  \r\n  </td>\r\n  <td>";
  if (helper = helpers.request_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.request_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td>";
  if (helper = helpers.status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td>";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "  \r\n      <div hidden id=\"request_type";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n      <div hidden id=\"request_display_id";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.request_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.request_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>  \r\n   </td>\r\n  \r\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.show_created_by), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  \r\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.show_changed_by), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  \r\n  <td>";
  if (helper = helpers.createdTime) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.createdTime); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td class=\"action-col\">\r\n    <span class=\"glyphicon glyphicon-new-window\" data-toggle=\"modal\" data-target=\"#modelRequestViewModal";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span>\r\n  </td>";
  return buffer;
  });
templates['mygroup-instance-details-modal'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal fade\" id=\"instanceViewModal";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"instance-details-modal\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n        <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"glyphicon glyphicon-ok\"></span>Model Details</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div><span class=\"modal-text-header\">Name:</span><span class=\"modal-text-field\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n        <div><span class=\"modal-text-header\">Type:</span><span class=\"modal-text-field\">";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n        <div><span class=\"modal-text-header\">Created:</span><span class=\"modal-text-field\">";
  if (helper = helpers.created) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.created); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n        <div><span class=\"modal-text-header\">State:</span><span class=\"modal-text-field\">";
  if (helper = helpers.state) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.state); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n        <div><span class=\"modal-text-header\">Group:</span><span class=\"modal-text-field\">";
  if (helper = helpers.group) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\r\n      </div>\r\n    </div><!-- /.modal-content -->\r\n  </div><!-- /.modal-dialog -->\r\n</div>";
  return buffer;
  });
templates['mygroup-instances-list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.state) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.state); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.created) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.created); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (helper = helpers.group) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>";
  return buffer;
  });
templates['mygroup-member-delete-modal'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- Modal -->\r\n<div class=\"modal fade\" id=\"userDeleteModal";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n        <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"warning-sign glyphicon glyphicon-warning-sign\"></span>Remove the user?</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"modal-header-box\">\r\n          This user <span class=\"warning-sign\">(";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ")</span> will be permanently removed from your group and cannot be recovered.\r\n        </div>\r\n        <div class=\"modal-warning-box\">\r\n          <span class=\"confirm-sign glyphicon glyphicon-hand-right\"></span> Are you sure?\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <form src=\"/marvl/\">\r\n          \r\n          <button type=\"submit\" class=\"btn btn-danger\">Remove the user</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n        </form>\r\n      </div>\r\n    </div><!-- /.modal-content -->\r\n  </div><!-- /.modal-dialog -->\r\n</div><!-- /.modal -->";
  return buffer;
  });
templates['mygroup-member-details-modal'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal fade\" id=\"userViewModal";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"member-details-modal\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n        <h4 class=\"modal-title\" id=\"myModalLabel\"><span class=\"glyphicon glyphicon-ok\"></span>Member Details</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div><span class=\"modal-text-header\">Member Name:</span><span class=\"modal-text-field\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n        <div><span class=\"modal-text-header\">Email:</span><span class=\"modal-text-field\">";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n        <div><span class=\"modal-text-header\">Organization:</span><span class=\"modal-text-field\">";
  if (helper = helpers.organization) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.organization); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n        <div><span class=\"modal-text-header\">AAF User:</span><span class=\"modal-text-field\">";
  if (helper = helpers.aaf) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.aaf); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\r\n      </div>\r\n    </div><!-- /.modal-content -->\r\n  </div><!-- /.modal-dialog -->\r\n</div>";
  return buffer;
  });
templates['mygroup-members-list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "  <td>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td>";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td>";
  if (helper = helpers.is_group_admin) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.is_group_admin); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td>";
  if (helper = helpers.organization) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.organization); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td class=\"action-col\">\r\n    <span class=\"glyphicon glyphicon-new-window\" data-toggle=\"modal\" data-target=\"#userViewModal";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span>\r\n    <!-- <span class=\"glyphicon glyphicon-trash\" data-toggle=\"modal\" data-target=\"#userDeleteModal";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span> -->\r\n  </td>";
  return buffer;
  });
templates['notification-list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "  <td>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td>";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td>";
  if (helper = helpers.createdBy) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.createdBy); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n  <td>";
  if (helper = helpers.createdTime) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.createdTime); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>";
  return buffer;
  });
templates['pagination'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a href=\"#\">";
  if (helper = helpers.page) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.page); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>";
  return buffer;
  });
templates['pagination_metadata'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "View ";
  if (helper = helpers.start) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.start); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " - ";
  if (helper = helpers.end) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.end); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " of ";
  if (helper = helpers.total_items) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.total_items); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1);
  return buffer;
  });
})();