const express = require("express"); 
const app = express(); 
const PORT = process.env.PORT || 3000; 
const v1Router = require("./v1/routes/routes")
const v2Router = require("./v2/routes/routes")


app.use("/api/v1/", v1Router);
app.use("/api/v2/", v2Router);

app.listen(PORT, () => { 
    console.log(`API is listening on port http://localhost:${PORT}`); 
});