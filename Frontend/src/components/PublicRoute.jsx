import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useSelector((state) => state.user);

    // wait for auth check
    if (loading) {
        return null; // or loader
    }

    // already logged in → redirect to home
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PublicRoute;