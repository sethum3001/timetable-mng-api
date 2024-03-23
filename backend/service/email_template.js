const email_template = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timetable Change Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
        }

        p {
            color: #666;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }

        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Timetable Change Notification</h1>
        <p>Dear Student,</p>
        <p>We would like to inform you about changes in the timetable:</p>
        <ul>
            <li><strong>Date:</strong> [Date of Change]</li>
            <li><strong>Time:</strong> [New Time]</li>
            <li><strong>Course:</strong> [Course Name]</li>
            <li><strong>Location:</strong> [New Location]</li>
        </ul>
        <p>Please review the updated timetable and plan accordingly.</p>
        <p>If you have any questions or concerns, feel free to contact us.</p>
        <a href="#" class="button">View Timetable</a>
        <p>Best regards,<br>University Timetable Management Team</p>
    </div>
</body>

</html>
`

module.exports = email_template;