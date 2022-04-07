package controlers;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

import spark.Request;
import spark.Response;

public class HistoryControler {

    public String findAll(Request req, Response res) {
        String r = "";
        try {
            Stream<Path> s = Files.list(Path.of("src/aaa"));
            s.forEach(path -> {
                String allData = Files.readString(path, StandardCharsets.UTF_8);
                System.out.println(allData);
                r += path;
                r += "\n";
                r += allData;
                r += "\n";
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return r;
    }
}
