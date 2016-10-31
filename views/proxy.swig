<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <h3>Yes proxy!</h3>
  <h4>省份地区：</h4>
  <p>
    {% for area in region %}
    <span>{{ area.name }}{% if !loop.last %}、{% endif %}</span>
    {% endfor %}
  </p>
</body>
</html>