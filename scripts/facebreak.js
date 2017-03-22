function simulateClick(element) {
  if (!element) return;
  var dispatchEvent = function (elt, name) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(name, true, true);
    elt.dispatchEvent(clickEvent);
  };
  dispatchEvent(element, 'mouseover');
  dispatchEvent(element, 'mousedown');
  dispatchEvent(element, 'click');
  dispatchEvent(element, 'mouseup');
};

//Returns true if it is a DOM element    
function isElement(o) {
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
  );
}

function removeCommentBoxes() {
  var commentboxes = document.evaluate('//*[@id="u_0_1m"]/div/div/div[not(@id)]', document, null, XPathResult.ANY_TYPE, null );
  try {
    var node = commentboxes.iterateNext();
    if(node) {
      node.parentNode.removeChild(node);
    }  
  } catch (e) {
    dump( 'Error: Document tree modified during iteration ' + e );
  }
}

// Set up the mutation event handler.
var targets = document.getElementsByClassName("jewelButton");

if(targets.length>1) {
  var target = targets[2];

  if(isElement(target)) {
    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
      simulateClick(document.querySelectorAll('[data-testid="non_react_mark_all_as_read_link"]')[0]);
    });
 
    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true, subtree: true };
 
    // pass in the target node, as well as the observer options
    observer.observe(target, config);
  }
}

// Just in case there is a notification waiting for us upon login…
simulateClick(document.querySelectorAll('[data-testid="non_react_mark_all_as_read_link"]')[0]);



// Removes the container for the "pop-up" notification elements, so
// they can't be added.
var notificationPagelet = document.getElementById("NotificationsBeeperPagelet");

if(isElement(notificationPagelet)) {
  notificationPagelet.parentNode.removeChild(notificationPagelet);
}


//
// Listen for and remove the comment boxes as they appear
//
/*var target = document.getElementById("pagelet_dock");

if(target) {
  if(isElement(target)) {
    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
      removeCommentBoxes();
    });
 
    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true, subtree: true };
 
    // pass in the target node, as well as the observer options
    observer.observe(target, config);
  }
}*/

removeCommentBoxes()