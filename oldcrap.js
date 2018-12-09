async addOrder(quantity) {
  const { navigate } = this.props.navigation;
  const { navigation } = this.props;
  const item = navigation.getParam('item', "Bread");
  const price = navigation.getParam('price', "3.00");
  const description = navigation.getParam('description', "Delicious freshly baked");
  const dietaryRestrictions = navigation.getParam('dietaryRestrictions', "None");
  // const quantity = this.state.quantity;
  const restaurant = navigation.getParam('restaurant', "Panera");
  const expirationDate = navigation.getParam('expirationDate', "9:00PM today")
  const datePosted = navigation.getParam('datePosted', "2:45PM today")
  var user = firebase.auth().currentUser;
  var email = user.email;
  var total = price * quantity;
  var currentTime = new Date();
  var orderTime = currentTime.valueOf();
  var userOrderQuery = firebase.database().ref('activeOrders/').orderByChild("userEmail").equalTo(email).limitToFirst(1);
  console.log(userOrderQuery);
  console.log('going through query')
  var alreadyHasActiveOrder = false;
  // await userOrderQuery.on("child_added", async function(orderSnapshot) {
  //   console.log('user already has active order');
  //   console.log("order Snapshot: ", orderSnapshot);
  //   alreadyHasActiveOrder = true;
  //   var snapshotRef = orderSnapshot.key;
  //
  //   var foodItemsOld = firebase.database().ref('activeOrders/' + snapshotKey).child("foodItems");
  //   //var foodItemsOld = orderSnapshot.ref.child("foodItems");
  //
  //   console.log('OLD FOOD ITEMS REFERENCE: ');
  //   console.log(foodItemsOld);
  //
  //   // var foodItemsQuery = orderSnapshot.ref.child("foodItems").orderByChild("item").equalTo(item).limitToFirst(1);
  //   // console.log("created foodItemsQuery: ", foodItemsQuery);
  //   // var containsItem = false;
  //   // await foodItemsQuery.on("value", async function (foodSnapshot) {
  //   //   // the food item already exists in the cart, so update the quantity
  //   //   console.log("food item already exists in user order");
  //   //   console.log(foodSnapshot.val());
  //   //   containsItem = true;
  //   //   this.props.navigation.navigate('UserPost');
  //   //   return;
  //   // })
  //
  //   var oldTotal = orderSnapshot.child("total").val();
  //   console.log("oldTotal ", oldTotal);
  //
  //   await foodItemsOld.push({
  //     item: item,
  //     price: price,
  //     description: description,
  //     quantity: quantity,
  //     subtotal: total,
  //     dietaryRestrictions: dietaryRestrictions,
  //     datePosted: datePosted,
  //     expirationDate: expirationDate
  //   })
  //
  //   console.log('AFTER PUSHING TO OLD FOOD ITEMS');
  //   console.log(foodItemsOld);
  //
  //   var newTotal = oldTotal + total;
  //   console.log(newTotal);
  //
  //
  //   console.log("snapshotRef", snapshotRef);
  //   await firebase.database().ref('activeOrders/' + snapshotKey).update({
  //   // await snapshotRef.update({
  //     orderTime: orderTime,
  //     total: newTotal,
  //     userEmail: email,
  //     restaurant
  //   });
  //   console.log("all done yay");
  //
  //     this.props.navigation.navigate('UserPost');
  //     return;
  // })
  // if (!alreadyHasActiveOrder) {
  //   // case where user does not have an existing active order in the database
  //   console.log("adding user order")
  //
  //   activeOrdersRef = firebase.database().ref('activeOrders/');
  //   console.log(activeOrdersRef);
  //   var newOrder = activeOrdersRef.push();
  //   var foodItems = {};
  //   await newOrder.update({
  //     userEmail: email,
  //     restaurant,
  //     orderTime,
  //     foodItems
  //   })
  //
  //   console.log("brand newOrder: ", newOrder);
  //
  //   this.props.navigation.navigate('UserPost');
  //   return;
  // }
  await userOrderQuery.once("value", async function(orderSnapshot) {
    if (orderSnapshot.exists()) {
      console.log('user already has active order');
      //var snapshotKey = orderSnapshot.ref;
      var snapshotKey = Object.keys(orderSnapshot.val())[0];

      console.log("snapshotKey", snapshotKey);
      console.log("order Snapshot: ", orderSnapshot);

      //var foodItemsOld = firebase.database().ref('activeOrders/' + snapshotKey).child("foodItems");
      var foodItemsOld = firebase.database().ref('activeOrders/' + snapshotKey).child("foodItems");

      console.log('OLD FOOD ITEMS REFERENCE: ');
      console.log(foodItemsOld);

      var oldTotal = orderSnapshot.child("total").val();
      console.log("oldTotal ", oldTotal);

      await foodItemsOld.push({
        item: item,
        price: price,
        description: description,
        quantity: quantity,
        subtotal: total,
        dietaryRestrictions: dietaryRestrictions,
        datePosted: datePosted,
        expirationDate: expirationDate
      })

      console.log('AFTER PUSHING TO OLD FOOD ITEMS');
      console.log(foodItemsOld);

      var newTotal = oldTotal + total;
      console.log(newTotal);


      console.log("snapshotKey", snapshotKey);
      await firebase.database().ref('activeOrders/' + snapshotKey).update({
        orderTime: orderTime,
        total: newTotal
      });
      console.log("all done yay");

      this.props.navigation.navigate('UserPost');
      return;
    }
    else {
      console.log("adding user order")

      activeOrdersRef = firebase.database().ref('activeOrders/');
      console.log(activeOrdersRef);
      var newOrder = activeOrdersRef.push();
      console.log("new ORDER KEY", newOrder);
      var foodItems = {};
      await newOrder.update({
        userEmail: email,
        restaurant,
        orderTime,
        total,
        foodItems
      })

      //var newOrderKey = newOrder.key;

      var newFoodItem = newOrderKey.child("foodItems").push().key;

      await newFoodItem.push({
        item: item,
        price: price,
        description: description,
        quantity: quantity,
        subtotal: total,
        dietaryRestrictions: dietaryRestrictions,
        datePosted: datePosted,
        expirationDate: expirationDate
      })

      console.log("brand newOrder: ", newOrder);

      this.props.navigation.navigate('UserPost');
      return;
    }
  });
}
