
# Part I: Items For Sale

Add an item in `#shopa`. Use below format:

```html
<div>
    <div>
        <h2>Name of Item</h2>
        <img src="href of image" alt="alt text">
        <p>Description of Item, 2-3 sentences</p>
    </div>
    <div class="item-child">
        <p class="price">$Price</p>
        <div class="value">
            <button class="control" onclick="values('counter1', true);">▲</button>
            <div id="counter1" class="counter">0</div>
            <button class="control" onclick="values('counter1', false);">▼</button>
        </div>
        <button class="add-to-cart" onclick="addCart('counter1', 'name of item', price, this);">+ Add to Cart</button>
        <!-- 'price' is a float. -->
    </div>
</div>
<!-- 'counter1' is the corresponding counter id. If item is first, use 'counter1', and if second, use 'counter2', ect. -->
```

Counter has a third optional argument to manipulate maximum value. Argument should be in string form. Default is 10. In case such is used, adjust `${item === "Happily Evil Potionmakers" ? ", '5'" : ""}` in `<button class="controlo" onclick="valuesCart(this, true${item === "Happily Evil Potionmakers" ? ", '5'" : ""});">▲</button>` in `addCart()`.

# Part II: Checkout Form

To add a new input for the checkout form, just add in the space between start of form and `#form-buttons`. If using new input type, style accordingly with CSS. Make sure to add a `label` element for the input and a `name` attribute.

**Supported Inputs (CSS)**
- text
- email
- number
- date
- radio

Also, go to `submitFormA()` and change the validity to fit the new input.

# Part III: Other Small Changes

1. To change the header, edit the `header` element. A `h1` element is nessesary, and descriptive `p` elements are optional but recomended. Don't touch the pages.
2. When adding a page, don't forget to add the page id to every `select()` and change `repeat()` in the CSS code in the `nav` element. Do not remove the original 3 pages: Home, Shop, Cart.
3. To change the homepage, edit `div[id="home"]`.
4. To change the favicon, edit the href attribute of `link[rel="icon" type="image/png"]`. Use .PNG with invisible background only. It is highly recomended to download logo and use `href="logo.png"`.
5. To change the maximum purchase, update if statement condition in `check()`, the UI message, and the error statement `p[id="error"]`. It is not recomended to delete the maximum purchase, but if it is nessesary, remove `check()`, `p[id="error"]`, and the section in the UI message.
6. Currently, the data is alerted and forgotten. To remember, it is possible to directly save the output of `analyseData()` as it is an array.
7. When doing any change, make sure everything works alright for phones `(max-width: 767px)` and tablets `(min-width: 768px)` as well as desktops `(min-width: 1023px)`.
