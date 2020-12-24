import db, { auth } from './firebase';


/**  AGGREGATION  **/
/*
  Client-side data aggregation.
*/

// onCreate
async function aggregateOnCreate(expense) {
  const uid = auth.currentUser.uid;
  const { yyyy:year, mm:month }  = expense;
  const price = Number(expense.price);
  
  const doc = await db
    .doc(uid)
    .collection('aggregation')
    .doc(`${year}`)
    .get();
    
  if (doc.exists) { // check if the year collection exists.
    let { monthlyTotal, total } = doc.data();

    if (monthlyTotal[month] !== undefined) {
      // if months total already exists.
      monthlyTotal[month] += price;

      db.doc(uid)
        .collection('aggregation')
        .doc(`${year}`)
        .set({
          total: total + price,
          monthlyTotal: monthlyTotal,
        });

    } else {
      // if months total doesn't exist.

      db.doc(uid)
        .collection('aggregation')
        .doc(`${year}`)
        .set({
          total: total + price,
          monthlyTotal: { ...monthlyTotal, [month]: price }
        });
    }
  } else {
    // if year collection doesn't exist
    db.doc(uid)
      .collection('aggregation')
      .doc(`${year}`)
      .set({
        total: price,
        monthlyTotal: { [month]: price }
      })
  }
    
}

export { aggregateOnCreate };