# פרויקט סוף מודול Node.JS

- את מרבית הקוד כתבנו בליווי המרצה אלרן לאורך החודשיים האחרונים במהלך השיעורים.
- מצורף קובץ הדרישות לפרויקט ובמהלך קובץ זה אפרט את הדרישות ואת השינויים שביצעתי עד לסיום הפרויקט הנוכחי - פרויקט סיכום צד שרת קורס פולסטאק


## טכנולוגיות בשימוש
לצורך בניית פרויקט זה השתמשתי במגוון ספריות מבית NPM והן לפי דרישות המטלה.


| library | use |
| ------ | ------ |
| Express.JS | ספרייה לניהול בקשות HTTP |
| BCryptjs | הצפנת טקסט בדרך מקובלת |
| Joi | ולידציה של קלט בשרת מהמשתמש |
| JsonWebToken | שיטה להעברת מידע בצורה מאובטחת|
| Config |  |
| Morgan | LOGGER אשר ידפיס את כל הבקשות הנשלחות לשרת |
| Cors | על מנת למנוע חיבור לשליטה מפרונט שיושב על אותו המחשב בו יושב השרת |
| Mongoose | ממשק API לניהול מסד נתונים של MongoDB |
| Chalk* | לצורך צביעת הדפסות קריטיות לקונסול לצורך נוחות וסימון |
| nodemon | מאפשר לנו לאתחל את שרת node.js שלנו בכל שינוי מתבצע בקובץ|
*ירדה החובה להשתמש בספרייה
<HR>

### להתקנה:

```
npm i express bcryptjs joi jsonwebtoken config morgan cors mongoose chalk nodemon
```


## הפעלה ראשונית

ראשית עלינו להתקין ו/או לעדכן את את כל תיקיית package.json

```sh
npm i
```
לאחר מכן לפתוח את האטלס של MongoDB ולזרוע בו את מבני הנתונים הבסיסיים מקובץ seed.js ו-data.js
```sh
node seed.js
```
ולבסוף יש להריץ את הפרויקט ע"י קריאה לשרת
```sh
nodemon
```

## שימוש בפונקציות CRUD
להלן פירוט המימושים של פעולות הCRUD לפי המשתמשים והכרטיסיות.

### USERS:
בוצע מימוש לכל פעולות היצירה, קריאה, עדכון ומחיקה
<Br>
עיקריי המשימות:
<Br>
Users PATCH - שינוי המפתח isBusiness

- usersRouter:
```sh
router.patch('/:id', mustLogin, allowedRoles(['admin']), toggleIsBusiness)
```

- usersSchemas:
```sh
changeIsBusinessToggle:
    Joi.object().keys({
      isBusiness: Joi.boolean().required()
    }).options(validationOptions),
```

- userControllers:
```sh
const { error, value } = schemas.changeIsBusinessToggle.validate(req.body);
```
המתודה תשנה אך ורק את המפתח isBusiness ולא שם מפתח אחר
<HR>
מתודות POST שהן רישום משתמש חדש והתחברות נכתבו תחת נתיב auth ולא
<HR>

### CARDS:
בוצע מימוש לכל פעולות היצירה, קריאה, עדכון ומחיקה
<Br>
עיקריי המשימות:
<Br>
Cards PATCH - ביצוע לייק לכרטיסייה והסרה במידה ובוצע קודם לכן
- usersRouter:
```sh
router.patch('/:cardId', mustLogin, likeCard) 
```
- cardsSchemas:
```sh
updateCard:
  Joi.object().keys({
    ...
      likes: Joi.object({
        userId: Joi.string().required()
      })
  })...
```

  - cardsControllrs:
  ```sh
  const likeCard = async (req, res) => {
  try {

    const { cardId } = req.params;
    const { id } = req.user;

    const card = await Card.findById(cardId);

    const userIndex = card.likes.indexOf(id);
    if (userIndex === -1) {
      card.likes.push(id);
    } else {
      card.likes.splice(userIndex, 1);
    }

    await card.save();
    res.status(200).send(card);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
```
המתודה תוסיף את ה-ID של המשתמש למערך הלייקים של הכרטיסייה, לחיצה נוספת תסיר את הלייק

### Auth:

קיים נתיב בשם auth וקובץ controlles המכיר פונקציות נצרכות לשם בדיקה אם משתמש מחובר או את זהות המשתמש אם אדמין, ביזנס או המשתמש עצמו לצורך פעולות לפי הדרישה של הוראות הפרויקט

- mustLogin
```sh
const mustLogin = (req,res,next) => {
  
  const token = req.header('x-auth-token')
  if (!token) return res.status(403).json({ sucees: false, message: 'Forbidden: you must be logged-in to view this content' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload;
    return next();
  } catch(err) {
    return res.status(403).json({ sucees: false, message: 'Forbidden: you must be logged-in to view this content' })
  }
}
```

- allowedRoles
```sh
const allowedRoles = (allowedRoles) => {
  return (req,res,next) => {
    const { isBusiness, isAdmin } = req.user;

    // check agains allowedRoles
    if (allowedRoles.includes('admin') && isAdmin) hasRole=true;
    if (allowedRoles.includes('business') && isBusiness) hasRole=true;
    if (allowedRoles.includes('ownUser') && jwt.decode(req.header('x-auth-token')).id === req.params.id) hasRole = true;

    // user does not meet the required roles
    if (!hasRole) {
      const allowedRolesString = allowedRoles.join('/')
      return res.status(401).json({ success: false, message: `Unauthorized: only ${allowedRolesString} users can access this resource` })
    }

    // allowed !
    return next();
  }
}
```
- דוגמא לשימוש בפונקציות הללו
```sh
router.get('/:flavor', mustLogin, allowedRoles(["admin", "ownUser"]), getIceCream)
```

## שאלות בונוס
### BizNumber
שינוי מספר עסק שמבוצע אך ורק ע"י משתמש מסוג admin
<br>
ובתנאי שמספר העסק פנוי

- cardsRoutes.js
```sh
router.patch('/biz/:cardId', mustLogin, allowedRoles(["admin"]), changeBizNumber)
```
- cardsControllers
```sh
const existingCard = await Card.findOne({ bizNumber });
    if (existingCard) {
      return res.status(400).json({ message: 'BizNumber already in use' });
    }

    // update new biz number
    const card = await Card.findByIdAndUpdate(cardId, { bizNumber }, { new: true });
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({success: true, "fixed card": card});
```

# סוף דבר
הפרויקט הנוכחי היה לי מלמד מאוד ונהנתי מכל רגע, באמת, לא ריאלי, אבל נהנתי
אני אמשיך לפתח אותו עד לתאריך ההגשה הסופי וממנו אגזור את צד השרת לפרויקט סוף הקורס

תודה על השלד היציב של הפרויקט שממנו רק אפשר היה לפתח ((:
