import matplotlib.pyplot as plt

def bar_chart(data, title):
    data.plot(kind="bar")
    plt.title(title)
    plt.ylabel("Count")
    plt.show()
