import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Swal from "sweetalert2";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("New password and confirmation do not match.");
            Swal.fire({
                title: "Password Mismatch",
                text: "New password and confirmation do not match.",
                icon: "error",
            });
            return;
        }

        fetch("http://localhost:4000/users/changepassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ currentPassword, newPassword })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.code === "PASSWORD-CHANGE-SUCCESS") {
                setSuccess(true);
                setError("");
                Swal.fire({
                    title: "Password Change Success",
                    text: "Your password has been successfully changed!",
                    icon: "success"
                });
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                setError(data.message);
                Swal.fire({
                    title: "Password Change Failed",
                    text: data.message,
                    icon: "error"
                });
            }
        })
        .catch(error => {
            setError("An error occurred while changing the password.");
            console.error("Error:", error);
            Swal.fire({
                title: "Error",
                text: "An unexpected error occurred. Please try again.",
                icon: "error"
            });
        });
    };

    return (
        <Container className="p-5 mt-4 bg-light rounded shadow">
            <h2 className="mb-4 text-center">Change Password</h2>
            <Form onSubmit={handleSubmit}>
                {/* Current Password */}
                <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            className="txt"
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? <EyeSlash /> : <Eye />}
                        </Button>
                    </InputGroup>
                </Form.Group>

                {/* New Password */}
                <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            className="txt"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <EyeSlash /> : <Eye />}
                        </Button>
                    </InputGroup>
                </Form.Group>

                {/* Confirm New Password */}
                <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            className="txt"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeSlash /> : <Eye />}
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Button type="submit" variant="primary" size="lg" className="w-100">
                    Change Password
                </Button>
            </Form>
        </Container>
    );
}
