module.exports={
    BACKEND_PORT:process.env.BACKEND_PORT || 3001,
    JWT_SECRET:process.env.JWT_SECRET || "ok",
    EXPIRES_IN: process.env.EXPIRES_IN || "1d"
}