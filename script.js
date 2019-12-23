function display(obj) {
    $('.card').html('')
    var rowelement = 0;

    for (var key in obj) {
        var itemhtml = `<div  class="column col-lg-3 col-md-6 col-sm-12">
        <div id = "${key}" class="card" style="width: 18rem;">
            <img class="card-img-top" src=${obj[key].imgSrc} alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${obj[key].price}</h5>
                <p class="card-text">${obj[key].description}</p>
                <a href="#" class="btn btn-primary add-to-cart">add to card</a>
            </div>
        </div>
        </div>`

        $('.row').append(itemhtml)

    }

}

store = {
    1: {
        name: "item1",
        imgSrc: "http://pluspng.com/img-png/pants-png-hd-trousers-png-hd-500.png",
        price: 25,
        description: "hello there"
    },
    2: {
        name: "item2",
        imgSrc: "https://d2aj04my22b3l2.cloudfront.net/wp-content/uploads/2019/09/2937mo.jpg",
        price: 30,
        description: "summer 2019"

    },
    3: {
        name: "item3",
        imgSrc: "https://www.dhresource.com/0x0/f2/albu/g2/M00/B0/31/rBVaGlbrctuAHsboAAEKKGHxa2g121.jpg",
        price: 85,
        description: "new series"

    },
    4: {
        name: "item4",
        imgSrc: "http://digitalimagemakerworld.com/images/shoes-wallpaper/36852456-shoes-wallpaper.jpg",
        price: 29,
        description: "hello there"

    },
    5: {
        name: "item5",
        imgSrc: "https://caliroots.com/images/521519/large/needles-hd-pant-ej152b-noir.jpg",
        price: 64,
        description: "get a discount"

    },

    6: {
        name: "item6",
        imgSrc: "https://www.elsetge.cat/myimg/f/176-1768908_coat-pant-for-wedding-parties-white-background-image.jpg",
        price: 97,
        description: "toxido"

    },

    7: {
        name: "item7",
        imgSrc: "https://i.pinimg.com/originals/50/ba/f5/50baf5e8da377ee3bbc343baf0d26bea.jpg",
        price: 245,
        description: "elegance"

    },


    8: {
        name: "item8",
        imgSrc: "https://www.froggtoggs.com/images/NTHD8319_Black-00.jpg?resizeid=2&resizeh=350&resizew=350",
        price: 115,
        description: "blue jeans"

    }

}


display(store)












// ************************************************
// Shopping Cart API
// ************************************************
var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function (event) {
    var obj = store[this.closest('.card').id]
    event.preventDefault();
    var name = obj.name
    var price = obj.price
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

// Clear items
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>" +
            "<td>" + cartArray[i].name + "</td>" +
            "<td>(" + cartArray[i].price + ")</td>" +
            "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
            "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
            "<button class='plus-item btn btn-primary  input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
            "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
            " = " +
            "<td>" + cartArray[i].total + "</td>" +
            "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('body').on("click", ".minus-item", function (event) {


    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();