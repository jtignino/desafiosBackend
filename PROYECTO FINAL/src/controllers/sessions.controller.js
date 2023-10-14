const current = async (req, res) => {
    try {
        const user = req.user;
        res.sendSuccess(user);
    } catch (error) {
        console.log(error);
    }
}

export {
    current
}