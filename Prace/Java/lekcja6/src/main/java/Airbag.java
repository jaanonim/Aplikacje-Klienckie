public class Airbag {
    private String name;
    private boolean value;

    @Override
    public String toString() {
        return "{" +
                "\"name\":\"" + name + '\"' +
                ", \"value\":" + value +
                '}';
    }
}
