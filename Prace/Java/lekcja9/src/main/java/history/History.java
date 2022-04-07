package history;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.google.gson.Gson;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import spark.Request;
import spark.Response;

public class History {
    public static void log(Request req, Response res, String value) {
        String directory = "logs";
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy-HH-mm-ss-SSSS");
        String fileName = formatter.format(date) + ".log";
        Path path = Paths.get(directory, fileName);
        Gson gson = new Gson();

        String content = "";
        content += req.requestMethod();
        content += " ";
        content += req.url();
        content += "\n";
        content += "Params: \n";
        content += gson.toJson(req.queryParams());
        content += "\n";
        content += "Body: \n";
        content += req.body();
        content += "\n";
        content += "Response:";
        content += res.status();
        content += "\n";
        content += value;

        try {
            Files.writeString(path, content, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
