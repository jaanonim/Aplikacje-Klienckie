public class Airbag {
    private String name;
    private boolean value;

    public Airbag(String name, boolean value) {
        this.name = name;
        this.value = value;
    }

    @Override
    public String toString() {
        return "{" +
                "\"name\":\"" + name + '\"' +
                ", \"value\":" + value +
                '}';
    }
}
