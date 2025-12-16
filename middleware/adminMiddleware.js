module.exports = function isAdmin(req, res, next) {
    try{
        const role = req.user?.role;
        if(!role || role !== 'admin') {
            return res.status(403).json({ message: "Admin access required"});
        }
        next();

    } catch(err) {
            console.error('isAdmin error', err);
            res.status(500).json({ message: "Server error"});
        }
};
